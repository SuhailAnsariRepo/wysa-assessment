# 1) REST API interaction flows

## For screen 1, Add User data.

### POST /setuser
Host: {{baseUrl}}
```
{
"updateObject":
  {
    username: "Suhail"
  }
}
```
### response:


```
{
  "status": 200,
  "message": "User Added",
  "displayMessage": "Successful"
}
```

## For screen 2, Add Sleep Struggle data.

### POST /sleepStuggle
Host: {{baseUrl}}
```
{
  "updateObject": {
    username: "Suhail",
    sleepStuggle: "2 to 8 weeks"
  }
}
```
### response:
```

{
  "status": 200,
  "msg: "Sleep Struggle response added",
  "displayMessage": "Successful"
}
```

## For screen 3, Add Go to Bed Time.

### POST /goTobed
Host: {{baseUrl}}
```
{
  "updateObject": {
    username: "Suhail",
    goTobed: "11:00 Pm"
  }
}
```
### response:
```
{
  "status": 200,
  message: "Go to bed response added",
  displayMessage: "Successful",
}
```
## For screen 4, Add Get Out of Bed Time.

### POST /getOutofBed
Host: {{baseUrl}}
```
{
  "updateObject": {
    username: "Suhail",
    getOutofBed: "7:00 Am"
  }
}
```
### response:
```
{
  "status": 200,
  message: "Get out of Bed response added",
  displayMessage: "Successful"
}
```
## For screen 5, Add typical day sleep Hours.

### POST /sleepHours
Host: {{baseUrl}}
```
{
  "updateObject": {
    username: "Suhail",
    sleepHours: "5"
  }
}
```
### response:
```
{
  "status": 200,
  message: "Sleep Hours response added",
  displayMessage: "Successful",
}
```
## For screen 6, Calculate Efficiency.

### POST /sleepEfficiency
Host: {{baseUrl}}
```
{
Calculate effiency based on data added.
  {
    \_id: new ObjectId("645f527d5024d0c22489d2ba"),
    username: 'Suhail',
    sleepStuggle: '2 to 8 weeks',
    goTobed: '11:00 Pm',
    getOutofBed: '7:00 Am',
    sleepHours: '5',
    sleepEfficiency: 0,
    \_\_v: 0
  }
}
```
### response:
```
{
  "status": 200,  
   sleepEfficiency: 63,
   displayMessage: "Successful",
}
```
# 2) Database schema
```
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  sleepStuggle: { type: String ,default:""},
  goTobed: { type: String,default:"" },
  getOutofBed: { type: String ,default:""},
  sleepHours: { type: String ,default:""},
  sleepEfficiency: { type: Number,default:0 }
});
```
