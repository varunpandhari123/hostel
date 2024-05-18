const hostel = [
    {
      _id: "645aae56db7005c0dc64fd93",
      name: "Vindhya Hostel",
      location: "https://goo.gl/maps/Yh9aW1ZJ2Mf4WxDq9",
      rooms: 300,
      capacity: 600,
      vacant: 250,
    },
    {
      _id: "645aae56db7005c0dc64fd94",
      name: "Ganga Hostel",
      location: "https://goo.gl/maps/Xj3L8KZ7w9f5TzjJ8",
      rooms: 400,
      capacity: 800,
      vacant: 400,
    },
    // ... other hostels
  ];
  
  // Store in localStorage
  localStorage.setItem("hostel", JSON.stringify(hostel));
  