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
    response.redirect("dashboard");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("weatherTop", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("dashboard");
    } else {
      console.log(`A user with email: ${request.body.email} was not found.`);
      response.redirect("login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.weatherTop;
    return await userStore.getUserByEmail(userEmail);
  },

  async editProfile(request, response) {
    const user = await accountController.getLoggedInUser(request)
    if (user) {
      const viewData = {
        user: user
      };
      response.render('edit-profile', viewData);
    }
    else {
      response.redirect('login');
    }
  },

  async updateName(request, response) {
    const user = await accountController.getLoggedInUser(request)
    if (user) {
      userStore.updateName(user, request.body.firstName, request.body.lastName);
      response.redirect('/edit-profile');
    }
    else {
      response.redirect('/login');
    }
  },

  async updateEmail(request, response) {
    const user = await accountController.getLoggedInUser(request)
    if (!user) {
      response.redirect('/login');
    }
    else if (request.body.oldEmail === user.email) {
      userStore.updateEmail(user, request.body.newEmail);
      response.redirect('/edit-profile')
    }
    else {
      console.log(`Previous email was incorrect.`);
      response.redirect('/edit-profile')
    }
  },

  async updatePassword(request, response) {
    const user = await accountController.getLoggedInUser(request)
    if (!user) {
      response.redirect('/login');
    }
    else if (request.body.currentPassword === user.password) {
      if (request.body.newPassword === request.body.confirmNewPassword) {
        userStore.updatePassword(user, request.body.newPassword);
        response.redirect('/edit-profile')
      }
      else {
        console.log(`Error: password not updated. New password and confirm new password do not match.`);
        response.redirect('/edit-profile')
      }
    }
    else {
      console.log(`Current password was incorrect.`);
      response.redirect('/edit-profile')
    }
  },
};