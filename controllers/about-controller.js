export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About Weather Top",
      titleLink: "/dashboard",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
