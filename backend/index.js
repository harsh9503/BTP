const express = require("express");
const app = express();
const net = require("net");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

const database = require("./config/database");
const {cloudinaryConnect } = require("./config/cloudinary");


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

net.setDefaultAutoSelectFamily(false);
//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);

//def route

app.get("/", (req, res) => {
    const htmlContent = "<h1>Welcome to My Server</h1><p>Server is running</p>";
    return res.send(htmlContent);
});
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})