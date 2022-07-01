import React, { useEffect, useState } from 'react';
import { Grid, Card, TextField, CircularProgress, Button, MenuItem } from '@material-ui/core'
import InputField from '../../../components/common/InputField'
import { Autocomplete } from '@material-ui/lab';
import * as action from './actions'
import * as groupAction from '../Groups/action'
import DateFnsUtils from '@date-io/date-fns';
import { getObject } from '../../../utils'
import customerValidation from '../../../containers/Validations/addCustomerValidations.js'
import customerPOSValidation from '../../../containers/Validations/addPOSCustomerValidations'
import moment from 'moment'
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers';
import StateName from './state'
import { useDispatch, useSelector } from 'react-redux';

const initialCustomer = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    groupName: '',
    pincode: '',
    authCredit: '',
    description: '',
    country: 'India',
    dob: null
}

let object = getObject("bitesbee-token");
let { name = '' } = object && JSON.parse(object) || '';

function AddCustomerForm(props) {
    const dispatch = useDispatch()
    const { isLoading = false, groups, groupById = {}, reset = false } = useSelector(state => state.group) || {}
    const { values: allGroups = [], count, start, limit } = groups || {}

    const { cities = {}, stateLoading = false, states = {}, citiesLoading = false, createLoading = false } = useSelector(state => state.customer) || {}

    const { values: citiesData = [] } = cities || {}
    const { values: statesData = [] } = states || {}

    const [errors, setError] = useState({})
    const [customer, setCustomer] = useState({ ...initialCustomer })
    const [selectedGroup, setSelectedGroup] = useState([])
    const [selectCityName, setSelectCityName] = useState({})
    const [searchingTimeout, setSearchingTimeout] = useState(null)
    const [statesSelect, setStatesSelect] = useState('')

    const phoneExist = props?.phoneExist

    useEffect(() => {
        dispatch(groupAction.GetAllGroup())
        dispatch(action.GetCitiesData())
        dispatch(action.GetStateData())
        const { customerDetails = {}, update, phoneNumber = {}, phoneExist } = props
        // phoneNumber.inputValue
        if (phoneExist) {
            setCustomer({
                phoneNumber: phoneNumber.inputValue,
                dob: null
            })
        }
        const { email = "", firstName = "", lastName = "", phone = "", group = [], city = "", state = "", birthDate = null, addressLineOne = "", addressLineTwo = "", authorizeCredit = "", postCode = "", description = "" } = customerDetails
        if (update) {
            setCustomer({
                ...customer, firstName, email, lastName, phoneNumber: phone, groupName: name,
                authCredit: authorizeCredit,
                dob: birthDate, pincode: String(postCode), description, address1: addressLineOne, address2: addressLineTwo, selectedGroup: name
            })
            setStatesSelect(state)
            setSelectCityName({ value: city, district: city })
            dispatch(action.GetCitiesData(state))
            setSelectedGroup(group)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { update } = props
        if (isValid()) {
            if (update) {
                const { customerDetails } = props;
                const { _id } = customerDetails
                let data = {
                    requiredFlag: phoneExist ? 0 : 1,
                    firstName: customer.firstName || '',
                    lastName: customer.lastName || '',
                    email: customer.email || '',
                    phone: customer.phoneNumber || '',
                    group: Array.isArray(selectedGroup) && selectedGroup.map(group => group._id) || [],
                    birthDate: customer.dob && moment(customer.dob).format('x') || '',
                    country: customer.country || '',
                    city: selectCityName?.district || '',
                    state: statesSelect || '',
                    postCode: customer.pincode || '',
                    authorizeCredit: Number(customer.authCredit || '') || '',
                    description: customer.description || '',
                    addressLineOne: customer.address1 || '',
                    addressLineTwo: customer.address2 || '',
                    createdBy: name || '',
                    _id: _id || ''
                }
                Object.keys(data).forEach((k) => {
                    if (data[k] === 0) {
                    }
                    else if (!data[k]) {
                        delete data[k]
                    }
                });
                dispatch(action.EditCustomer(data)).then(response => {
                    props.toast.success(response.message || "Customer edited successfully!")
                    dispatch(action.GetAllCustomer())
                    props.goToCustomer()
                }).catch(err => {
                    props.toast.error((err?.response?.data?.message) || 'Something went wrong.')
                })
                return true
            }

            let formData = {
                requiredFlag: phoneExist ? 0 : 1,
                firstName: customer.firstName || '',
                lastName: customer.lastName || '',
                email: customer.email || '',
                phone: customer.phoneNumber || '',
                group: Array.isArray(selectedGroup) && selectedGroup.map(group => group._id) || [],
                birthDate: customer.dob && moment(customer.dob).format('x') || '',
                country: customer.country || '',
                city: selectCityName?.district || '',
                state: statesSelect || '',
                postCode: customer.pincode || '',
                authorizeCredit: Number(customer.authCredit || '') || '',
                description: customer.description || '',
                addressLineOne: customer.address1 || '',
                addressLineTwo: customer.address2 || '',
                createdBy: name || '',
            }
            // const form = phoneExist ? Object.keys(formData).forEach((k) => !formData[k] && delete formData[k]) : "";

            Object.keys(formData).forEach((k) => {
                if (formData[k] === 0) {
                }
                else if (!formData[k]) {
                    delete formData[k]
                }
            });
            dispatch(action.CreateCustomer(formData)).then(response => {
                props.toast.success(response.message || 'Customer added successfully.')
                dispatch(action.GetAllCustomer())
                if (props.phoneExist) {
                    props.closeModal()
                } else {
                    props.goToCustomer()
                }
            }).catch(err => {
                props.toast.error(err?.response?.data?.message || "Something went wrong.")
            })
        }
    }

    const isValid = () => {
        if (phoneExist) {
            const { isValid = true, errors = {} } = customerPOSValidation({ ...customer, dob: moment(customer.dob).format('x') || '', selectCityName: selectCityName.district, statesSelect })
            setError(errors)
            return isValid;
        } else {
            const { isValid = true, errors = {} } = customerValidation({ ...customer, dob: moment(customer.dob).format('x') || '', selectCityName: selectCityName.district, statesSelect })
            setError(errors)
            return isValid;
        }
    }


    const handleChange = (e) => {
        let { name = "", value = "" } = e.target;

        let balanceRegex = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
        let numberReg = /^[0-9]{0,10}$/;


        if (name == "pincode" && value && !numberReg.test(value)) return;
        if (name == "phoneNumber" && value && !numberReg.test(value)) return;
        if (name == "authCredit" && value && !balanceRegex.test(value)) return;


        if (name == "pincode" && value.length > 6) return;
        if (name == "phoneNumber" && value.length > 10) return;
        if (name == "authCredit" && value.length > 8) return;

        setCustomer({ ...customer, [name]: value })
        setError({ ...errors, [name]: '' })
    }

    const handleDateOfBirth = (date) => {
        setCustomer({ ...customer, dob: date })
    }

    const handleClickCustomer = () => {
        props.goToCustomer()
    }

    const selectGroup = (e, group) => {
        setSelectedGroup(group)
        setError({ errors: { ...errors, selectedGroup: '' } })
    }

    const selectAllGroup = (e, selectedGroup) => {
        setSelectedGroup(selectedGroup)
    }

    const getGroupName = (e) => {
        const { value } = e.target;
        if (searchingTimeout)
            clearTimeout(searchingTimeout);

        if (value.length != 1) {
            setSearchingTimeout(setTimeout(() =>
                dispatch(groupAction.SearchGroupByFilter({ term: value, limit: "all" })), 100))
        }

    }

    const selectCity = (e, city) => {
        setError({ errors: { ...errors, selectCityName: '' } })
        setSelectCityName(city)
    }

    const getCityName = (e) => {
        const { value } = e.target;
        if (searchingTimeout)
            clearTimeout(searchingTimeout);

        // if (value.length != 1) {
        //     setSearchingTimeout(setTimeout(() =>
        //         dispatch(action.GetCitiesData()), 100))
        // }

    }


    const handleState = ({ target: { value } }) => {
        // setCustomer({ ...initialCustomer, states: value })
        setStatesSelect(value)
        setError({ ...errors, states: "" })
        setSelectCityName({})
        dispatch(action.GetCitiesData(value))
    }

    const allGrouplist = Array.isArray(allGroups) && allGroups.length ? allGroups : [] || [];
    let groupOption = [{ _id: 1, name: 'Select All', value: 'Select All' }, ...allGrouplist]
    if (selectedGroup && selectedGroup.length === allGrouplist.length) {
        groupOption = groupOption.slice(1)
    }
    const valid = phoneExist ? customer.phoneNumber || false : customer.firstName && customer.email && customer.phoneNumber && customer.address1 && customer.pincode && selectCityName && statesSelect || false

    return (
        <Card className="form-detail-inner box-shadow-none">
            <h5 className="text-public-custom">{phoneExist ? 'Add Customer' : 'Personal Information'}</h5>
            {!phoneExist ?
                <form onSubmit={handleSubmit} >
                    <Grid container className="mt-2">
                        <Grid item sm={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} sm={12} lg={3} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.firstName}
                                        label="First Name"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        fullWidth
                                        className="form-group"
                                        error={errors.firstName}
                                        required
                                        inputProps={{
                                            maxlength: 40
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={3} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.lastName}
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        error={errors.lastName}
                                        fullWidth
                                        className="form-group"
                                        inputProps={{
                                            maxlength: 40
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.email}
                                        label="Email ID"
                                        placeholder="Enter email ID"
                                        name="email"
                                        fullWidth
                                        required
                                        className="form-group"
                                        error={errors.email}

                                    />
                                    {Object.values(errors).includes('Please enter valid email address') ? <span className="help-block error">{errors.email}</span> : ``}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.phoneNumber}
                                        label="Phone Number"
                                        placeholder="Enter phone number"
                                        name="phoneNumber"
                                        fullWidth
                                        required
                                        className="form-group"
                                        error={errors.phoneNumber}
                                    />
                                    {Object.values(errors).includes('Please enter 10 digit valid phone number') ? <span className="help-block error">{errors.phoneNumber}</span> : ``}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} className="">
                                    <Autocomplete
                                        id="asynchronous-demo"
                                        options={groupOption}
                                        getOptionSelected={(option, value) => option?._id === value?._id}
                                        value={selectedGroup}
                                        getOptionLabel={(groups) => groups?.name}
                                        onChange={(e, value) => {
                                            const isSelectAll = value.find(item => item.value === 'Select All')
                                            if (isSelectAll) {
                                                return selectAllGroup(e, allGrouplist)
                                            } else {
                                                selectGroup(e, value)
                                            }
                                        }}
                                        // onChange={(e, value) => selectGroup(e, value)}
                                        fullWidth
                                        limitTags={5}
                                        filterSelectedOptions
                                        multiple
                                        loading={isLoading}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Group Name"
                                                variant="outlined"
                                                name="parentCategory"
                                                placeholder="Enter and select group name"
                                                value={selectedGroup && selectedGroup.name}
                                                // error={errors.selectedGroup}
                                                className="width-drop-down cus-select-box"
                                                onChange={e => getGroupName(e)}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {isLoading ? <div className="contact-loader">
                                                                <CircularProgress size={15} />
                                                            </div> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={12} md={6} lg={6} className="add-image-custom">
                                    <div className="add-date-picker">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                // disableToolbar
                                                autoOk
                                                maxDate={moment().startOf().valueOf()}
                                                fullWidth
                                                variant="inline"
                                                format="dd-MM-yyyy"
                                                margin="normal"
                                                id="date-picker-dob"
                                                className='bbb'
                                                label="Date of Birth"
                                                placeholder="Select date of birth"
                                                value={customer.dob}
                                                onChange={(date) => handleDateOfBirth(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <span className="help-block error">{errors.dob}</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.authCredit}
                                        label="Authorize Credit"
                                        placeholder="Enter authorize credit"
                                        name="authCredit"
                                        fullWidth
                                        className="form-group"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} sm={12} lg={12} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.description}
                                        label="Description"
                                        placeholder="Enter description"
                                        name="description"
                                        fullWidth
                                        className="form-group"
                                        multiline
                                        rows={2}
                                        inputProps={{
                                            maxlength: 500
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <h5 className="text-public-custom mt-4">Address</h5>

                    <Grid container className="mt-2">
                        <Grid item sm={12}>
                            <Grid container spacing={3}>
                                <CInputField
                                    handleChange={handleChange}
                                    value={customer.address1}
                                    label="Address Line 1"
                                    placeholder="Enter address line 1"
                                    name="address1"
                                    required
                                    error={phoneExist ? false : errors.address1}
                                />
                                <CInputField
                                    handleChange={handleChange}
                                    value={customer.address2}
                                    label="Address Line 2 (Optional)"
                                    placeholder="Enter address line 2 (Optional)"
                                    name="address2"
                                />
                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.country}
                                        label="Country"
                                        disabled
                                        placeholder="Enter country name"
                                        name="country"
                                        fullWidth
                                        className="form-group"
                                    />

                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        fullWidth
                                        label="State"
                                        variant="outlined"
                                        onChange={handleState}
                                        value={statesSelect}
                                        className="form-group "
                                        error={phoneExist ? false : errors.statesSelect}
                                        displayEmpty
                                        required
                                        placeholder="csdsdcs"
                                        defaultValue={''}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {statesData && statesData.length ? statesData.map(state => {
                                            return <MenuItem key={state._id} value={state.name}>{state.name || 'No options Available'}</MenuItem>
                                        }) : []}

                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} className="">
                                    <Autocomplete
                                        id="city-id"
                                        options={Array.isArray(citiesData) && citiesData.length ? citiesData : [] || []}
                                        getOptionSelected={(option, value) => (option?.district) == (value?.district)}
                                        getOptionLabel={(groups) => (groups?.district)}
                                        onChange={(e, value) => selectCity(e, value)}
                                        fullWidth
                                        value={selectCityName || {}}
                                        disabled={citiesLoading || statesSelect == ""}
                                        // filterSelectedOptions
                                        loading={citiesLoading}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                label="City"
                                                variant="outlined"
                                                name="parentCategory"
                                                placeholder="Enter and select city name"
                                                value={selectCityName && selectCityName.name}
                                                error={phoneExist ? false : errors.selectCityName}
                                                className="width-drop-down cus-select-box"
                                                onChange={e => getCityName(e)}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {citiesLoading ? <div className="contact-loader">
                                                                <CircularProgress size={15} />
                                                            </div> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={3} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.pincode}
                                        label="Pin Code"
                                        placeholder="Enter pin code"
                                        name="pincode"
                                        error={phoneExist ? false : errors.pincode}
                                        fullWidth
                                        required
                                        className="form-group"
                                    />
                                    {Object.values(errors).includes('Please enter 6 digit valid pincode') ? <span className="help-block error">{errors.pincode}</span> : ``}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                :
                <form onSubmit={handleSubmit} >
                    <Grid container className="mt-2">
                        <Grid item sm={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} sm={12} lg={12} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.phoneNumber}
                                        label="Phone Number"
                                        placeholder="Enter phone number"
                                        name="phoneNumber"
                                        fullWidth
                                        required
                                        className="form-group"
                                        error={errors.phoneNumber}
                                    />
                                    {Object.values(errors).includes('Please enter 10 digit valid phone number') ? <span className="help-block error">{errors.phoneNumber}</span> : ``}
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.firstName}
                                        label="First Name"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        fullWidth
                                        className="form-group"
                                        // error={errors.firstName}
                                        inputProps={{
                                            maxlength: 40
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.lastName}
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        error={errors.lastName}
                                        fullWidth
                                        className="form-group"
                                        inputProps={{
                                            maxlength: 40
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={12} >
                                    <InputField
                                        onChange={handleChange}
                                        value={customer.email}
                                        label="Email ID"
                                        placeholder="Enter email ID"
                                        name="email"
                                        fullWidth
                                        className="form-group"
                                        error={errors.email}

                                    />
                                    {Object.values(errors).includes('Enter valid email address') ? <span className="help-block error">{errors.email}</span> : ``}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            }
            <Grid item xs={12} sm={12} lg={12} className="text-right mt-4">
                {props.update ? <Button type="button" onClick={handleClickCustomer} className="button-btn btn-custom-black mr-3" >Cancel</Button> : ''}
                {props.closeIcon ? <Button type="button" onClick={() => props.closeModal()} className="button-btn btn-custom-black mr-3" >Cancel</Button> : ''}
                <Button type="button" onClick={handleSubmit} className={`button-btn btn-custom-primry ${valid ? '' : 'disabled'} `} disabled={createLoading}>{createLoading ? <CircularProgress size="24px" color="white" /> : 'Submit'}</Button>
            </Grid>
        </Card>
    )
}
export default AddCustomerForm

const CInputField = ({
    handleChange,
    value,
    label,
    placeholder,
    name,
    error,
    required
}) => {
    return <Grid item xs={12} md={6} sm={12} lg={6} >
        <InputField
            placeholder={placeholder}
            error={error}
            name={name}
            label={label}
            value={value}
            onChange={handleChange}
            fullWidth
            className="form-group"
            required={required}
        />
    </Grid>
}