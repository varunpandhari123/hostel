const getTotalComplaints = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/complaint/register", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
  
      if (data.success) {
        return data.complaints.length;
      } else {
        console.error("Failed to fetch complaints:", data.errors);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      return 0;
    }
  };
  
  export default getTotalComplaints;
  