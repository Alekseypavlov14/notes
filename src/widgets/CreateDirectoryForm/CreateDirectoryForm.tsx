import { CreateDirectoryFormData, defaultInitialValues, validateForm } from './form'
import { Form, Formik, FormikHelpers } from 'formik'
import { formCreateMode, FormMode } from '@/features/forms'
import { Button, Input, Space } from 'antd'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import styles from './CreateDirectoryForm.module.css'

interface CreateDirectoryFormProps {
  mode: FormMode
  initialValues?: Partial<CreateDirectoryFormData>
  onSubmit: (data: CreateDirectoryFormData) => void | Promise<void>
}

export function CreateDirectoryForm({ mode, initialValues = {}, onSubmit }: CreateDirectoryFormProps) {
  const normalizedInitialValues = deepMerge<CreateDirectoryFormData>(defaultInitialValues, initialValues)

  const submitButtonText = mode === formCreateMode ? 'Create' : 'Edit'

  async function submitHandler(data: CreateDirectoryFormData, { resetForm }: FormikHelpers<CreateDirectoryFormData>) {
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