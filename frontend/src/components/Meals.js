import React from 'react';
import {useState, useEffect, useMemo} from "react"
import {
    Card,
    CardContent,
    CardActionArea,
    CardHeader,
    List,
    ListItem,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    ListSubheader,
    InputAdornment,
    MenuItem,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import TodayIcon from "@mui/icons-material/Today";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Box from '@mui/material/Box';
import SearchIcon from "@mui/icons-material/Search";
import { Container, Typography } from '@mui/material';
import Footer from './Footer';

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
export default function Meals(props) {

    const [dietHistory, setDietHistory] = useState([])

    const [foodName, setFoodName] = useState("")
    const [calories, setCalories] = useState("")
    const [mealName, setMealName] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [searchText, setSearchText] = useState("")
    const [ingredient, setIngredient] = useState("")
    const [foodItems, setFoodItems] = useState({});


    const displayedOptions = useMemo(
        () => Object.keys(foodItems).filter((option) => containsText(option, searchText)),
        [searchText]
      );


    const handleCreateMeal = (event) => {
        axios({
            method: 'post',
            url: "/createMeal",
            headers: {
                Authorization: "Bearer " + props.state.token
            },
            data:{
                mealName : mealName,
                ingredients : ingredients
            }
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

    const handleCreateCustomFood = (event) => {
        axios({
            method: 'post',
            url: "/createFood",
            headers: {
                Authorization: "Bearer" + props.state.token
            },
            data:{
                foodName : foodName,
                calories : calories
            }
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

    const handleIngredientSelection = (event) => {
        const {
          target: { value },
        } = event;
        setIngredients(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    useEffect(() => {
        axios({
            method: "GET",
            url: "/foodCalorieMapping",
            headers: {
              Authorization: "Bearer " + props.state.token,
            },
          })
            .then((response) => {
              const res = response.data;
              setFoodItems(res);
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            });
    //     axios({
    //         method: "POST",
    //         url: "/weekHistory",
    //         headers: {
    //           Authorization: "Bearer " + props.state.token,
    //         },
    //         data: {
    //           todayDate: dayjs().format('MM/DD/YYYY')
    //         }
    //       })
    //         .then((response) => {
    //           const res = response.data;
    //           setDietHistory(res.sort((a, b) => b.dayIndex - a.dayIndex));
    //           let weekHistoryData = res.map((dayObj) => {
    //             return {
    //               date: dayObj.date,
    //               consumedCalories: dayObj.caloriesConsumed,
    //               burntCalories: dayObj.burntCalories,
    //             };
    //           });
    //         })
    //         .catch((error) => {
    //           if (error.response) {
    //             console.log(error.response);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //           }
    //         });
    }, []);
  return (
    <div>
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '60px' }}>
        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Meals
                        </Typography>
      </Container>
      <Container maxWidth>
        <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"custom-food custom-food custom-food create-meal create-meal create-meal"
                              "meal meal meal meal meal meal"`,
            paddingTop: "2rem",
          }}>
          <Card sx={{ gridArea: "custom-food" }} elevation={5}>
            <CardHeader
              title={"Custom Food"}
              subheader={"Enter the food name and calorie information to add it to the list of foods"}
              avatar={<FastfoodIcon />}
            />
            <CardContent>
              <form onSubmit={handleCreateCustomFood}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ paddingBottom: "1rem" }}>
                    <FormControl fullWidth>
                      
                      <TextField 
                        label="Food Item Name"
                        id="foodName"
                        value={foodName}
                        onChange={(event) => {
                            setFoodName(event.target.value);
                        }} 
                        type="text"
                        required                     
                      />
                    </FormControl>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TextField
                      label="Calories"
                      id="calories"
                      value={calories}
                      onChange={(event) => {
                        setCalories(event.target.value);
                      }}
                      type="number"
                      required
                    />
                    <Button type="submit" variant="contained" size="large">
                      Create Food
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
          <Card sx={{ gridArea: "create-meal" }} elevation={5}>
            <CardHeader
              title={"Create Meal"}
              subheader={"Enter the meal name and select the ingredients to create a meal"}
              avatar={<FastfoodIcon />}
            />
            <CardContent>
              <form onSubmit={handleCreateMeal}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ paddingBottom: "1rem" }}>
                    <FormControl fullWidth>
                      
                      <TextField 
                        label="Meal Name"
                        id="mealName"
                        value={mealName}
                        onChange={(event) => {
                            setMealName(event.target.value);
                        }} 
                        type="text"
                        required                     
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ paddingBottom: "1rem" }}>
                    <FormControl fullWidth>
                      <InputLabel id="ingredients">
                        Ingredient Name
                      </InputLabel>
                      <Select
                        MenuProps={{ autoFocus: false }}
                        labelId="ingredientName"
                        id="search-select"
                        multiple
                        value={ingredients}
                        label="Ingredient Name"
                        onChange={handleIngredientSelection}
                        required
                      >
                        <ListSubheader>
                        <TextField
                          size="small"
                          // Autofocus on textfield
                          autoFocus
                          placeholder="Type to search..."
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            )
                          }}
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              // Prevents autoselecting item while typing (default Select behaviour)
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                        {displayedOptions.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                          )
                        )}
                      </Select>
                      </FormControl>
                  </Box>
                    <Button type="submit" variant="contained" size="large">
                      Create Meal
                    </Button>
                  
                </Box>
              </form>
            </CardContent>
          </Card>
            <Card sx={{ gridArea: "meal" }} elevation={5}>
            <CardHeader
              title={"My Meals"}
              subheader={"Your custom created meals"}
              avatar={
                <>
                  <LunchDiningIcon />
                  <LocalCafeIcon />
                </>
              }
            />
            {/* <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                gridTemplateRows: "auto",
                gridTemplateAreas: `"day-0 day-1 day-2 day-3 day-4 day-5 day-6"`,
              }}
            >
              {dietHistory.map((day, index) => {
                return (
                  <Card sx={{ gridArea: `day-${day.dayIndex}` }} elevation={5}>
                    <CardHeader title={day.date} avatar={<TodayIcon />} />
                    <CardContent>
                      <div
                        style={{
                          color: day.exceededDailyLimit ? "red" : "green",
                          textAlign: "center",
                          fontWeight: "bold",
                          paddingBottom: "10px",
                        }}
                      >{`Total Calories : ${day.caloriesConsumed}`}</div>
                      <div style={{ textAlign: "center", fontWeight: "bold" }}>
                        Food Consumed
                      </div>
                      <div>
                        <List>
                          {day.foodConsumed.map((itemObj, ind) => {
                            return (
                              <ListItem
                                key={`item-${ind}`}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>{itemObj.item}</div>
                                <div>{itemObj.calories}</div>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    </CardContent>
                  </Card>
                ); */}
              {/* })}
            </CardContent> */}
          </Card>
        </Box>

      </Container>
      <Footer/>
    </div>
  );
};

