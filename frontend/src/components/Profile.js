import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  TextField,
  Avatar,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const weightCardStyles = {
  weightContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  weightText: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
};

function Profile(props) {
  const [targetWeight, settargetWeight] = useState("");
  const [currentTargetCalories, setTargetCalories] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [editableWeight, setEditableTargetWeight] = useState(targetWeight);
  const [editableTargetCalories, setEditableTargetCalories] = useState(currentTargetCalories);
  const [editableActivityLevel, setEditableActivityLevel] = useState(activityLevel);


  const handleSaveInput = (e) => {
    console.log(editableWeight, editableTargetCalories, editableActivityLevel)
    settargetWeight(editableWeight);
    setTargetCalories(editableTargetCalories);
    setActivityLevel(editableActivityLevel);
    console.log(targetWeight,currentTargetCalories, activityLevel)
    axios({
      method: "POST",
      url: "/goalsUpdate",
      headers: {
        Authorization: "Bearer " + props.state.token,
      },
      data: {
        targetWeight: editableWeight,
        targetCalories: editableTargetCalories,
        activityLevel: editableActivityLevel,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const initialFirstName = "";
  const initialLastName = "";
  const initialAge = "";
  const initialWeight = "";
  const initialHeight = "";
  const initialBMI = 0;
  const initialGender = "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [age, setAge] = useState(initialAge);
  const [weight, setWeight] = useState(initialWeight);
  const [height, setHeight] = useState(initialHeight);
  const [BMI, setBMI] = useState(initialBMI);
  const [gender, setGender] = useState(initialGender)
  const activityOptions = {Minimal:"Sedentary(Office Job)",Light: "Light exercise (1-2 days/week)",Moderate: "Moderate exercise (3-5 days/week)",Heavy: "Heavy exercise (6-7 days/week)",Athlete: "Athlete (2x per day)"}
  const genders = ["Male", "Female"]
  useEffect(() => {
    // Make API call to backend to get food items and their calories from DB.
    axios({
      method: "GET",
      url: "/profile",
      headers: {
        Authorization: "Bearer " + props.state.token,
      },
    })
      .then((response) => {
        const res = JSON.parse(response['data']);
        console.log(res)
        setFirstName(res.first_name)
        setLastName(res.last_name)
        setAge(res.age)
        setWeight(res.weight)
        setHeight(res.height)
        setGender(res.gender)
        setActivityLevel(res.activity_level)
        setTargetCalories(res.target_calories)
        settargetWeight(res.target_weight)
        setEditableActivityLevel(res.activity_level)
        setEditableTargetCalories(res.target_calories)
        setEditableTargetWeight(res.target_weight)
        setBMI(res.bmi)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    }, [props.state.token]);

    const handleProfileSubmit = (e) => {
      console.log('height=' + height + 'weight:'+ weight)
      axios({
        method: "POST",
        url: "/profileUpdate",
        headers: {
          Authorization: "Bearer " + props.state.token,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
          height: height,
          weight: weight,
          gender: gender
        },
      })
        .then((response) => {
          const res = response.data;
          console.log(res)
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    };

  return (
    <>
      <Container maxWidth>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 2,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"profile  goals goals goals bmi"
                                "profile  . . . ."`,
            paddingTop: "2rem",
          }}
        >
          <Card sx={{ gridArea: "profile" }} elevation={5}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {/* TODO : make profile pictures updatable */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingBottom: "5px",
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  <AccountCircleIcon sx={{ width: 70, height: 70 }} />
                </Avatar>
                <Typography variant="h5" mt={2}>
                  Profile
                </Typography>
              </Box>
              <Box mb={2}>
                <TextField
                  label="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Weight (lbs)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Height (ft)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
              <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {genders.map((item) => (
						<MenuItem key={item} value={item}>
						{item}
						</MenuItem>
						))}
                    </Select>
                  </FormControl>
              </Box>
              <Button variant="contained" color="primary" onClick={handleProfileSubmit}>
                Update  
              </Button>
            </CardContent>
          </Card>
          <Card sx={{ gridArea: "goals" }} elevation={5}>
            <CardHeader
            title={"Your Goals"}
            subheader={"Update your goals here"}
            />
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
                gridTemplateRows: "auto",
                gridTemplateAreas: `"targetWeight targetCalories activityLevel"
                                    ". saveButton ."`,
                paddingTop: "2rem",
              }}
            >
                <Card
                  sx={{ gridArea: "targetWeight" }}
                  elevation={2}
                >
                  <CardContent>
                    <div style={weightCardStyles.weightContainer}>
                      <IconButton
                        color="primary"
                        aria-label="weighing scale icon"
                      >
                        <FitnessCenterIcon fontSize="large" />
                      </IconButton>
                      <Typography style={weightCardStyles.weightText}>
                        {targetWeight}
                      </Typography>
                    </div>
                  </CardContent>
                  <TextField
                    label="Target Weight"
                    variant="outlined"
                    fullWidth
                    value={editableWeight}
                    onChange={(e) => setEditableTargetWeight(e.target.value)}
                  />
                </Card>
                <Card
                  sx={{ gridArea: "targetCalories" }}
                  elevation={2}
                >
                  <CardContent>
                    <div style={weightCardStyles.weightContainer}>
                      <IconButton
                        color="primary"
                        aria-label="weighing scale icon"
                      >
                        <WhatshotIcon fontSize="large" />
                      </IconButton>
                      <Typography style={weightCardStyles.weightText}>
                        {currentTargetCalories}
                      </Typography>
                    </div>
                  </CardContent>
                  <TextField
                    label="Daily Calories Burn Goal"
                    variant="outlined"
                    fullWidth
                    value={editableTargetCalories}
                    onChange={(e) => setEditableTargetCalories(e.target.value)}
                  />
                </Card>
                <Card
                  sx={{ gridArea: "activityLevel" }}
                  elevation={2}
                >
                  <CardContent>
                    <div style={weightCardStyles.weightContainer}>
                      <IconButton
                        color="primary"
                        aria-label="weighing scale icon"
                      >
                        <DirectionsRunIcon fontSize="large" />
                      </IconButton>
                      <Typography style={weightCardStyles.weightText}>
                        {activityLevel}
                      </Typography>
                    </div>
                  </CardContent>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Activity Level</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={editableActivityLevel}
                      label="Activity Level"
                      onChange={(e) => setEditableActivityLevel(e.target.value)}
                    >
                      {Object.keys(activityOptions).map((item) => (
						<MenuItem key={activityOptions[item]} value={item}>
						{activityOptions[item]}
						</MenuItem>
						))}
                    </Select>
                  </FormControl>
                </Card>
              <Button
                sx={{ gridArea: "saveButton" }}
                variant="contained"
                color="primary"
                onClick={handleSaveInput}
                maxWidth
              >
                Update
              </Button>
              </CardContent>
          </Card>
          <Card sx={{ gridArea: "bmi" }} elevation={5} alignItems = "center">
            <CardHeader
              title={"Your Body Mass Index (BMI)"}
              subheader={"Measured based on height and weight"}
            />
            <CardContent
              sx={{
                gap: 2,
                paddingTop: "2rem",
                alignItems: "center",
              }}
            >
            <Typography variant="h2" mt={2}>
              {BMI}
            </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Footer/>
    </>
  );
}

export default Profile;
