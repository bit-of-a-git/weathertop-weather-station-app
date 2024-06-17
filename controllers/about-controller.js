export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "Weather Top",
      subtitle: "Monitor latest weather station readings"
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
