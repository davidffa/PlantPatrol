interface Dataset {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

interface DataStructure {
  [key: number]: {
    [interval: number]: Dataset;
  };
}
export const DataCharts:DataStructure = {
  // Humidity
  1: {
    // By Day
    0: {
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      datasets: [
        {
          label: "Humidity (%)",
          data: [85, 88, 83, 75, 65, 60, 70, 80],
          borderColor: "green",
          fill: true,
        },
      ],
    },
    // By Week
    1: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Humidity (%)",
          data: [70, 65, 60, 75, 80, 78, 72],
          borderColor: "blue",
          fill: true,
        },
      ],
    },
    // By Month
    2: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Humidity (%)",
          data: [85, 80, 75, 70, 65, 60, 58, 63, 70, 75, 80, 85],
          borderColor: "blue",
          fill: true,
        },
      ],
    },
    // By Year
    3: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Humidity (%)",
          data: [70, 68, 65, 63],
          borderColor: "blue",
          fill: true,
        },
      ],
    },
  },

  // Temperature
  0: {
    // By Day
    0: {
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [18, 16, 17, 21, 28, 30, 26, 22],
          borderColor: "red",
          fill: true,
        },
      ],
    },
    // By Week
    1: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [24, 26, 28, 25, 23, 27, 29],
          borderColor: "red",
          fill: true,
        },
      ],
    },
    // By Month
    2: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [8, 10, 15, 18, 22, 26, 29, 30, 25, 20, 14, 10],
          borderColor: "red",
          fill: true,
        },
      ],
    },
    // By Year
    3: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [18, 19, 20, 22],
          borderColor: "red",
          fill: true,
        },
      ],
    },
  },

  // UV Light
  2: {
    // By Day
    0: {
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      datasets: [
        {
          label: "UV Light Index",
          data: [0, 0, 1, 4, 8, 10, 3, 0],
          borderColor: "orange",
          fill: true,
        },
      ],
    },
    // By Week
    1: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "UV Light Index",
          data: [6, 7, 8, 7, 5, 9, 10],
          borderColor: "orange",
          fill: true,
        },
      ],
    },
    // By Month
    2: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "UV Light Index",
          data: [2, 3, 5, 7, 9, 11, 10, 9, 7, 6, 3, 2],
          borderColor: "orange",
          fill: true,
        },
      ],
    },
    // By Year
    3: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "UV Light Index",
          data: [7, 8, 8, 9],
          borderColor: "orange",
          fill: true,
        },
      ],
    },
  },

  // Air Quality
  3: {
    // By Day
    0: {
      labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      datasets: [
        {
          label: "Air Quality (AQI)",
          data: [45, 40, 38, 50, 65, 70, 55, 50],
          borderColor: "gray",
          fill: true,
        },
      ],
    },
    // By Week
    1: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Air Quality (AQI)",
          data: [55, 60, 65, 58, 53, 70, 75],
          borderColor: "gray",
          fill: true,
        },
      ],
    },
    // By Month
    2: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Air Quality (AQI)",
          data: [45, 50, 55, 60, 65, 70, 75, 80, 60, 55, 50, 48],
          borderColor: "gray",
          fill: true,
        },
      ],
    },
    // By Year
    3: {
      labels: ["2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Air Quality (AQI)",
          data: [60, 62, 65, 70],
          borderColor: "gray",
          fill: true,
        },
      ],
    },
  },
};
