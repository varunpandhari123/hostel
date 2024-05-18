// getTotalStudents.js
const getTotalStudents = async () => {
    try {
      const hostel = JSON.parse(localStorage.getItem("hostel"));
      const response = await fetch("http://localhost:3000/api/student/get-all-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel }),
      });
      
      const data = await response.json();
  
      if (data.success) {
        return data.students.length;
      } else {
        console.error("Failed to fetch students:", data.errors);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      return 0;
    }
  };
  
  export default getTotalStudents;
  