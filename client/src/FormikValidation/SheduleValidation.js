export const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Обязательное поле';
    } else if (values.title.length > 20) {
        errors.title = '30 символов';
    }

    if (values.description.length > 100) {
        errors.description = 'Must be 20 characters or less';
    }

    if (Number(values.endDate) < Number(values.startDate)) {
        errors.endDate = 'Время окончания должно быть позже времени начала'
    }

    return errors;
};