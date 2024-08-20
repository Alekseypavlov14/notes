import { defaultInitialValues, NoteFormData, validateForm } from './form'
import { Form, Formik, FormikHelpers } from 'formik'
import { HandleExitPage } from './HandleExitPage'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import { Input } from 'antd'
import styles from './NoteForm.module.css'

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void | Promise<void>
  onExitPage?: (data: NoteFormData) => void | Promise<void>
  initialValues?: Partial<NoteFormData>
}

export function NoteForm({ 
  onSubmit, 
  onExitPage = () => {}, 
  initialValues = {},
}: NoteFormProps) {
  const normalizedInitialValues = deepMerge<NoteFormData>(defaultInitialValues, initialValues)

  async function submitHandler(data: NoteFormData, { resetForm }: FormikHelpers<NoteFormData>) {
    await onSubmit(data)
    resetForm()
  }

  return (
    <Formik
      initialValues={normalizedInitialValues}
      validate={validateForm}
      onSubmit={submitHandler}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className={styles.NoteForm}
        >
          <Input 
            name='name'
            className={styles.Control}
            placeholder='Name'
            value={values.name}
            onChange={handleChange}
            status={(errors.name && touched.name) ? 'error' : ''}
            autoComplete='off'
          />

          <Input.TextArea
            name='content'
            className={styles.Textarea}
            value={values.content}
            onChange={handleChange}
            status={(errors.content && touched.content) ? 'error' : ''}
            autoComplete='off'
          />

          <HandleExitPage onExitPage={onExitPage} />
        </Form>
      )}
    </Formik>
  )
}