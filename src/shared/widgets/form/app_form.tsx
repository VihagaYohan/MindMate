import React, { Component } from 'react'
import { Formik } from 'formik'

interface propTypes {
    initialValues: any
    onSubmit: (values: any) => void
    validationSchema: any
    children: React.ReactNode
}

const AppForm = ({
    initialValues,
    onSubmit,
    validationSchema,
    children
}: propTypes) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => <React.Fragment>{children}</React.Fragment>}
        </Formik>
    )
}

export default AppForm