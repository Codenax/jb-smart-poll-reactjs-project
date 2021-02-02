import React from 'react'
import shortid from 'shortid'
import Form from './form'

const defaultOptions = [
    { id: shortid.generate(), value: '', vote: 0 },
    { id: shortid.generate(), value: '', vote: 0 }

];

class PollForm extends React.Component {


    state = {
        title: '',
        description: '',
        options: defaultOptions,
        errors :{}
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOptionChange = (event, index) => {
        const { options } = this.state
        options[index].value = event.target.value;
        this.setState({ options })
    }

    createOption = () => {
        const { options } = this.state
        if (options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            });
            this.setState({ options })
        } else {
            alert('You can create max 5 options')
        }
    };
    deteteOption = index => {
        const { options } = this.state
        if (options.length > 2) {
            options.splice(index, 1)
            this.setState({ options })
        } else {
            alert('You must have at last two option')
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        const { isValid, errors } = this.validate();
        if (isValid) {
            const { title, description, options } = this.state
            this.props.submit({
                title,
                description,
                options
            })
            event.target.reset()
            this.setState({
                title: '',
                description: '',
                option: defaultOptions,
                errors: {}
            })
        } else {
            this.setState({ errors })
        }


    }
    validate = () => {
        const errors = {}
        const { title, description, options } = this.state
        if (!title) {
            errors.title = "Please provide a title"
        } else if (title.length < 20) {
            errors.title = 'Title too short'

        } else if (title.length > 200) {
            errors.title = 'Title too long'
        }


        if (!title) {
            errors.description = "Please provide a description"
        } else if (description.length > 500) {
            errors.description = 'Description too long'
        }

        const optionErrors = []
        options.forEach((opt, index) => {
            if (!opt.value) {
                optionErrors[index] = 'Option text empty'
            } else if (opt.value.length > 100) {
                optionErrors[index] = 'Option too long'
            }
        })
        if (optionErrors.length > 0) {
            errors.options = optionErrors
        }
        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    }


    render() {

        const { title, description, options, errors } = this.state

        return (
            <Form
                title={title}
                description={description}
                options={options}
                buttonValue={this.props.buttonValue || 'Create poll'}
                errors={errors}
                handleChange={this.handleChange}
                handleOptionChange={this.handleOptionChange}
                createOption={this.createOption}
                deteteOption={this.deteteOption}
                handleSubmit={this.handleSubmit}
            />
        );
    }

}

export default PollForm