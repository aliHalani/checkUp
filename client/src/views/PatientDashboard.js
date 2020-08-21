import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'
import { UserContext } from '../components/context/UserContext';
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import CardFooter from "../components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        padding: "36px 36px"
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    infoContainer: {
        '& grid': {
            marginTop: "10px"
        }
    },
    filled: {
        color: 'green',
        fontWeight: 600
    },
    ready: {
        color: 'orange',
        fontWeight: 600
    },
    in_progress: {
        color: 'red',
        fontWeight: 600
    }
};

const useStyles = makeStyles(styles);

export default function PatientDashboard() {
    const classes = useStyles();
    const [user, setUser, clearUser] = useContext(UserContext);
    console.log(useLocation.state);
    let [patient, setPatient] = useState({});
    let [prescriptions, setPrescriptions] = useState([])
    let [appointments, setAppointments] = useState([])
    let [selectedAppointment, setSelectedAppointment] = useState({})

    const prescriptionColumns = [{
        name: "name",
        label: "Name"
    },
    {
        name: "prescribed_on",
        label: "Prescribed On"
    },
    {
        name: "status",
        label: "Status",
        options: {
            customBodyRender: value => (
                <span className={value === "Filled" ? classes.filled :
                    value === "Ready for Delivery" ? classes.ready :
                        classes.in_progress}>
                    {value}
                </span>
            )
        }
    },
    {
        name: "fill_date",
        label: "Fill Date"
    }];

    const prescriptionDataTableOptions = {
        filterType: 'none',
        selectableRows: false,
        onRowClick: prescriptionClick
    };

    const appointmentColumns = [
        {
            name: "id",
            options: { display: false, viewColumns: false, filter: false }
        },
        {
            name: "doctor_name",
            label: "Doctor"
        },
        {
            name: "clinic_name",
            label: "Clinic"
        },
        {
            name: "time",
            label: "Date"
        },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: value => (
                    <span className={value === "Complete" ? classes.filled :
                        value === "In Progress" ? classes.in_progress :
                            classes.ready}>
                        {value}
                    </span>
                )
            }
        }];

    const appointmentDataTableOptions = {
        filterType: 'none',
        selectableRows: false,
        onRowClick: appointmentClick
    };

    useEffect(() => {
        fetch(`http://localhost:5000/patient/${user.id}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setPatient(data)
                console.log(data)
            })
            .catch((res) => {
                console.log("ERROR - retrieving patient")
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/prescriptionsForPatient/${user.id}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setPrescriptions(data.prescriptions)
                console.log(data.prescriptions)
            })
            .catch((res) => {
                console.log("ERROR - retrieving prescriptions")
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/appointmentsForPatient/${user.id}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setAppointments(data.appointments)
                console.log(data.appointments)
            })
            .catch((res) => {
                console.log("ERROR - retrieving appointments")
            })
    }, [])

    function appointmentClick(appointment) {
        fetch(`http://localhost:5000/appointment/${appointment[0]}`)
            .then(res => {
                if (!res.ok) { throw res }
                return (res.json())
            })
            .then((data) => {
                setSelectedAppointment(data)
                console.log(data)
            })
            .catch((res) => {
                console.log("ERROR - retrieving appointment")
            })
    }

    function prescriptionClick(prescription) {
        if (prescription[2].props.children === "Ready for Delivery") {
            alert("Order with HiRide!");
        }
    }

    return (
        <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{patient.first_name} {patient.last_name}</h4>
                            <p className={classes.cardCategoryWhite}>Patient Information</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Name
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.first_name} {patient.last_name}
                                    </Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Gender
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.gender}
                                    </Typography>
                                </GridItem>
                            </GridContainer>
                            <GridContainer addstyle={{ marginTop: "10px" }}>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        E-mail
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.email}
                                    </Typography>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Typography variant="inherit">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.phone_number}
                                    </Typography>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <MUIDataTable
                        title={"Prescription History"}
                        data={prescriptions}
                        columns={prescriptionColumns}
                        options={prescriptionDataTableOptions} />
                </GridItem>
            </GridContainer>

            <GridContainer >
                <GridItem xs={12} sm={12} md={12}>
                    <MUIDataTable
                        title={"Appointment History"}
                        data={appointments}
                        columns={appointmentColumns}
                        options={appointmentDataTableOptions} />
                </GridItem>
            </GridContainer>

            {selectedAppointment.doctor_name &&
                <React.Fragment>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Paper>
                                <Toolbar>
                                    <Typography variant="h6">
                                        Appointment Details
                            </Typography>
                                </Toolbar>
                                <CardBody nomargintop={true}>
                                    <GridContainer>

                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Doctor
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.doctor_name}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Status
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">

                                                <span className={selectedAppointment.status === "Complete" ? classes.filled :
                                                    selectedAppointment.status === "In Progress" ? classes.in_progress :
                                                        classes.ready}>
                                                    {selectedAppointment.status}
                                                </span>
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={3}>
                                            <Typography variant="inherit">
                                                Date
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.time}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Name
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_name}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Address
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_street_address}
                                            </Typography>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={2}>
                                            <Typography variant="inherit">
                                                Clinic Phone Number
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.clinic_phone_number}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer />
                                    <GridContainer>
                                        <GridItem xs={12}>
                                            <Typography variant="inherit">
                                                Booking Notes
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.description}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer />
                                    <GridContainer>
                                        <GridItem xs={12}>
                                            <Typography variant="inherit">
                                                Appointment Notes
                                    </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {selectedAppointment.notes}
                                            </Typography>
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Paper>
                        </GridItem>
                    </GridContainer>
                    </React.Fragment>
            }
        </div>
    )
}