import { userStore } from "../models/user-store.js";

export const accountController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Log in to WeatherTop",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("weatherTop", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Sign up to WeatherTop",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("weatherTop", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.weatherTop;
    return await userStore.getUserByEmail(userEmail);
  },
};