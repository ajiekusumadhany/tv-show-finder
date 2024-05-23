$(document).ready(function () {
  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
      greeting = "Good Morning";
    } else if (hours < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Night";
    }

    return greeting;
  }

  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  function displayGreetingAndDate() {
    const now = new Date();
    const greeting = getGreeting();
    const formattedDate = formatDate(now);

    $("#greeting").text(greeting);
    $("#date").text(formattedDate);
  }

  displayGreetingAndDate();

  const $input = $("#query-search");
  const $resultsContainer = $("#result-tv");

  $input.on("input", async function () {
    $(".result-img-tv").remove();
    $(".judul-tv").remove();
    $(".container-tv").remove();
    $resultsContainer.hide();

    const keyword = $input.val();
    if (keyword === "") return;

    const config = {
      params: { q: keyword },
    };

    try {
      const res = await axios.get("http://api.tvmaze.com/search/shows", config);
      getImages(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  const getImages = (shows) => {
    let showTv = false;
    for (let result of shows) {
      if (result.show.image) {
        const $containerTv = $("<div>").attr("class", "container-tv");
        const $img = $("<img>")
          .attr("src", result.show.image.medium)
          .attr("class", "result-img-tv");
        const $judul = $("<p>")
          .attr("class", "judul-tv")
          .text(result.show.name);
        $containerTv.append($img);
        $containerTv.append($judul);

        $resultsContainer.append($containerTv);
        showTv = true;
      }
    }
    if (showTv) {
      $resultsContainer.show();
    }
  };
});
