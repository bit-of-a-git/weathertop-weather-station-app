export const homeController = {
  async index(request, response) {
    const viewData = {
      title: "Weather Top",
      subtitle: "Select Dashboard or About"
    };
    console.log("home rendering");
    response.render("home-view", viewData);
  },
};