document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const connectBtn = document.getElementById('connectBtn');
    const formContainer = document.getElementById('formContainer');
    const userForm = document.getElementById('userForm');
    const mentorContainer = document.getElementById('mentorContainer');
    const mentorList = document.getElementById('mentorList');
    
    // Show form when connect button is clicked
    connectBtn.addEventListener('click', function() {
        formContainer.classList.remove('hidden');
        connectBtn.classList.add('hidden');
    });
    
    // Handle form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            state: document.getElementById('state').value
        };
        
        // Hide form and show mentors
        formContainer.classList.add('hidden');
        mentorContainer.classList.remove('hidden');
        
        // Show two random mentors
        showRandomMentors();
    });
    
    // Fetch mentors from server
    function fetchMentors() {
        return fetch('/api/mentors')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching mentors:', error);
                // Fallback to sample data in case of error
                return [
                    { id: 1, name: 'Rahul Sharma', expertise: 'Web Development'},
                    { id: 2, name: 'Priya Singh', expertise: 'Data Science'},
                    { id: 3, name: 'Amit Kumar', expertise: 'Mobile Development' },
                    { id: 4, name: 'Sneha Patel', expertise: 'UI/UX Design' },
                    { id: 5, name: 'Vikram Malhotra', expertise: 'Machine Learning' }
                ];
            });
    }
    
    // Function to show two random mentors
    function showRandomMentors() {
        // Clear previous mentors
        mentorList.innerHTML = '';
        
        // Fetch mentors from server
        fetchMentors()
            .then(mentors => {
                // Get two random mentors
                const randomMentors = getRandomMentors(mentors, 2);
                
                // Display mentors
                randomMentors.forEach(mentor => {
                    const mentorCard = document.createElement('div');
                    mentorCard.className = 'mentor-card';
                    mentorCard.dataset.mentorId = mentor.id;
                    
                    mentorCard.innerHTML = `
                        <img src="${mentor.image}" alt="${mentor.name}">
                        <h3>${mentor.name}</h3>
                        <p>${mentor.expertise}</p>
                        <button class="mentor-select-btn" data-mentor-id="${mentor.id}">Select</button>
                    `;
                    
                    mentorList.appendChild(mentorCard);
                });
                
                // Add event listeners to select buttons
                document.querySelectorAll('.mentor-select-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const mentorId = this.dataset.mentorId;
                        selectMentor(mentorId);
                    });
                });
            });
    }
    
    // Function to get random mentors
    function getRandomMentors(mentorArray, count) {
        const shuffled = [...mentorArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Function to select a mentor
    function selectMentor(mentorId) {
        // Get form data
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            state: document.getElementById('state').value,
            mentorId: mentorId
        };
        
        // Send data to server
        fetch('/api/select-mentor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mentorContainer.innerHTML = '<h2>Thank You!</h2><p>Your mentor has been selected. They will contact you soon.</p>';
            } else {
                alert('Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to connect to server. Please try again later.');
        });
    }
});