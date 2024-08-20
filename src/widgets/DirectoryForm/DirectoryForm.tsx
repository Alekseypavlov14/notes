import { DirectoryFormData, defaultInitialValues, validateForm } from './form'
import { Form, Formik, FormikHelpers } from 'formik'
import { formCreateMode, FormMode } from '@/features/forms'
import { Button, Input, Space } from 'antd'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import styles from './DirectoryForm.module.css'

interface DirectoryFormProps {
  mode: FormMode
  initialValues?: Partial<DirectoryFormData>
  onSubmit: (data: DirectoryFormData) => void | Promise<void>
}

export function DirectoryForm({ mode, initialValues = {}, onSubmit }: DirectoryFormProps) {
  const normalizedInitialValues = deepMerge<DirectoryFormData>(defaultInitialValues, initialValues)

  const submitButtonText = mode === formCreateMode ? 'Create' : 'Edit'

  async function submitHandler(data: DirectoryFormData, { resetForm }: FormikHelpers<DirectoryFormData>) {
    await onSubmit(data)
    resetForm()
  }

  return (
    <Formik
      initialValues={normalizedInitialValues}
      onSubmit={submitHandler}
      validate={validateForm}
    >
      {({
        values,
        errors,
        touched,
        handleChange, 
        handleSubmit
      }) => (
        <Form
          onSubmit={handleSubmit}
          className={styles.Form}
        >
          <Space
            className={styles.Structure} 
            direction='vertical'
            size='middle'
          >
            <Input 
              name='name'
              className={styles.Control}
              placeholder='Directory name'
              value={values.name}
              onChange={handleChange}
              status={(errors.name && touched.name) ? 'error' : ''}
              autoComplete='off'
            />

            <Button
              className={styles.SubmitButton}
              htmlType='submit'
              type='primary'
              block
            >
              {submitButtonText}
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  )
}