// tracker.js - Fitness Tracker with ExerciseDB API Integration
class FitnessTracker {
    constructor() {
        this.apiConfig = {
            exerciseDB: {
                baseURL: 'https://exercisedb.p.rapidapi.com',
                apiKey: 'e4e181e43emsh0e1911513aa2418p1ef9b2jsn89586de7c893', 
                host: 'exercisedb.p.rapidapi.com'
            }
        };
        this.userData = this.loadUserData();
        this.initEventListeners();
        this.checkApiStatus();
    }

    // Load user data from localStorage
    loadUserData() {
        const saved = localStorage.getItem('fitnessUserData');
        return saved ? JSON.parse(saved) : {
            age: null,
            weight: null,
            height: null,
            gender: null,
            activityLevel: null,
            fitnessGoals: null
        };
    }

    // Save user data to localStorage
    saveUserData() {
        localStorage.setItem('fitnessUserData', JSON.stringify(this.userData));
    }

    // Check if API key is configured
    checkApiStatus() {
        if (this.apiConfig.exerciseDB.apiKey === 'e4e181e43emsh0e1911513aa2418p1ef9b2jsn89586de7c893') {
            console.warn('ExerciseDB API key not configured.');
            this.showMessage('ExerciseDB API key not configured. Using demo data.', 'info');
        }
    }

    // Initialize event listeners
    initEventListeners() {
        // Profile form submission
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmit();
        });

        // Food search
        document.getElementById('search-food').addEventListener('click', () => {
            this.handleFoodSearch();
        });

        // Exercise search
        document.getElementById('search-exercises').addEventListener('click', () => {
            this.handleExerciseSearch();
        });

        // Calculate metrics
        document.getElementById('calculate-metrics').addEventListener('click', () => {
            this.calculateMetrics();
        });

        // Navigation
        document.querySelectorAll('.tracker-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.tracker-nav a').forEach(a => a.classList.remove('active'));
                e.target.classList.add('active');
                
                const targetId = e.target.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Enter key for searches
        document.getElementById('food-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleFoodSearch();
            }
        });

        document.getElementById('exercise-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleExerciseSearch();
            }
        });

        // Scroll progress
        window.addEventListener('scroll', this.updateScrollProgress);
    }

    // Handle profile form submission
    handleProfileSubmit() {
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const activityLevel = document.getElementById('activity-level').value;
        const fitnessGoals = document.getElementById('fitness-goals').value;

        this.userData = { age, gender, weight, height, activityLevel, fitnessGoals };
        this.saveUserData();
        
        this.showMessage('Profile saved successfully!', 'success');
    }

    // Handle food search (using demo data)
    async handleFoodSearch() {
        const query = document.getElementById('food-search').value.trim().toLowerCase();
        
        if (!query) {
            this.showMessage('Please enter a food item to search.', 'error');
            return;
        }

        const resultsContainer = document.getElementById('food-results');
        resultsContainer.innerHTML = '<div class="tracker-loading">Searching for nutrition information...</div>';

        // Using demo data for nutrition
        setTimeout(() => {
            const foodData = this.NUTRITION_DATA[query];
            
            if (foodData) {
                this.displayFoodResults([{
                    food_name: query.charAt(0).toUpperCase() + query.slice(1),
                    serving_qty: 1,
                    serving_unit: "serving",
                    nf_calories: foodData.calories,
                    nf_protein: foodData.protein,
                    nf_total_carbohydrate: foodData.carbs,
                    nf_total_fat: foodData.fat
                }]);
            } else {
                // Generate mock data for demo
                const mockFoods = [
                    {
                        food_name: query.charAt(0).toUpperCase() + query.slice(1),
                        serving_qty: 1,
                        serving_unit: "serving",
                        nf_calories: Math.floor(Math.random() * 200) + 50,
                        nf_protein: (Math.random() * 20).toFixed(1),
                        nf_total_carbohydrate: (Math.random() * 30).toFixed(1),
                        nf_total_fat: (Math.random() * 10).toFixed(1)
                    }
                ];
                this.displayFoodResults(mockFoods);
            }
        }, 1000);
    }

    // Handle exercise search with ExerciseDB API
    async handleExerciseSearch() {
        const query = document.getElementById('exercise-search').value.trim().toLowerCase();
        const bodyPart = document.getElementById('body-part').value;
        
        const resultsContainer = document.getElementById('exercise-results');
        resultsContainer.innerHTML = '<div class="tracker-loading">Searching ExerciseDB for exercises...</div>';

        try {
            let exercises = [];
            
            // Check if API key is configured
            if (this.apiConfig.exerciseDB.apiKey === 'e4e181e43emsh0e1911513aa2418p1ef9b2jsn89586de7c893') {
                throw new Error('API key not configured');
            }

            // Build API URL based on search criteria
            let apiUrl;
            if (bodyPart) {
                // Search by body part
                apiUrl = `${this.apiConfig.exerciseDB.baseURL}/exercises/bodyPart/${bodyPart}`;
            } else if (query) {
                // Search by name
                apiUrl = `${this.apiConfig.exerciseDB.baseURL}/exercises/name/${query}`;
            } else {
                // Get all exercises (limited to 50 for performance)
                apiUrl = `${this.apiConfig.exerciseDB.baseURL}/exercises?limit=50`;
            }

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': this.apiConfig.exerciseDB.apiKey,
                    'X-RapidAPI-Host': this.apiConfig.exerciseDB.host
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            exercises = await response.json();

            // Filter by search query if we got all exercises
            if (!bodyPart && query && exercises.length > 0) {
                exercises = exercises.filter(exercise => 
                    exercise.name.toLowerCase().includes(query) ||
                    exercise.target?.toLowerCase().includes(query) ||
                    exercise.equipment?.toLowerCase().includes(query)
                );
            }

            if (exercises.length === 0) {
                this.showMessage('No exercises found. Try a different search term.', 'info');
                resultsContainer.innerHTML = '';
                return;
            }

            this.displayExerciseResults(exercises.slice(0, 12));
            
        } catch (error) {
            console.error('Error fetching exercises from ExerciseDB:', error);
            
            // Fallback to demo data
            resultsContainer.innerHTML = '<div class="tracker-info">Using demo exercise data. To use real ExerciseDB API, add your RapidAPI key.</div>';
            this.handleExerciseSearchWithDemoData(query, bodyPart);
        }
    }

    // Fallback to demo exercise data
    handleExerciseSearchWithDemoData(query, bodyPart) {
        let exercises = this.EXERCISE_DEMO_DATA;
        
        // Filter by body part if selected
        if (bodyPart) {
            exercises = exercises.filter(exercise => 
                exercise.bodyPart?.toLowerCase().includes(bodyPart.toLowerCase())
            );
        }
        
        // Filter by search query if provided
        if (query) {
            exercises = exercises.filter(exercise => 
                exercise.name.toLowerCase().includes(query) ||
                exercise.target?.toLowerCase().includes(query) ||
                exercise.equipment?.toLowerCase().includes(query)
            );
        }
        
        this.displayExerciseResults(exercises.slice(0, 12));
    }

    // Display exercise search results
    displayExerciseResults(exercises) {
        const resultsContainer = document.getElementById('exercise-results');
        
        if (!exercises || exercises.length === 0) {
            resultsContainer.innerHTML = '<div class="tracker-error">No exercises found. Please try a different search.</div>';
            return;
        }

        const exerciseCards = exercises.map(exercise => `
            <div class="tracker-exercise-card">
                <div class="tracker-exercise-img">
                    ${exercise.gifUrl ? 
                        `<img src="${exercise.gifUrl}" alt="${exercise.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        '💪 ' + (exercise.bodyPart || 'Exercise')
                    }
                </div>
                <div class="tracker-exercise-info">
                    <h4 class="tracker-exercise-name">${exercise.name}</h4>
                    <div class="tracker-exercise-meta">
                        <div><strong>Body Part:</strong> ${exercise.bodyPart || 'Not specified'}</div>
                        <div><strong>Target:</strong> ${exercise.target || 'Not specified'}</div>
                        <div><strong>Equipment:</strong> ${exercise.equipment || 'Body weight'}</div>
                        ${exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 ? 
                            `<div><strong>Secondary Muscles:</strong> ${exercise.secondaryMuscles.join(', ')}</div>` : ''
                        }
                    </div>
                    <div class="tracker-nutrition-facts">
                        <strong>Instructions:</strong>
                        <div style="margin-top: 0.5rem; max-height: 100px; overflow-y: auto;">
                            ${this.formatExerciseInstructions(exercise)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        resultsContainer.innerHTML = `<div class="tracker-grid">${exerciseCards}</div>`;
    }

    // Format exercise instructions
    formatExerciseInstructions(exercise) {
        if (exercise.instructions && exercise.instructions.length > 0) {
            return `<ol style="text-align: left; margin: 0; padding-left: 1.2rem;">
                ${exercise.instructions.map(instruction => 
                    `<li style="margin-bottom: 0.5rem;">${instruction}</li>`
                ).join('')}
            </ol>`;
        } else {
            return '<p style="font-style: italic; margin: 0;">No specific instructions available. Focus on proper form and controlled movements.</p>';
        }
    }

    // Display food search results
    displayFoodResults(foods) {
        const resultsContainer = document.getElementById('food-results');
        
        if (!foods || foods.length === 0) {
            resultsContainer.innerHTML = '<div class="tracker-error">No food items found. Please try a different search term.</div>';
            return;
        }

        const foodCards = foods.map(food => `
            <div class="tracker-food-card">
                <div class="tracker-food-img">
                    🍎 ${food.food_name}
                </div>
                <div class="tracker-food-info">
                    <h4 class="tracker-food-name">${food.food_name}</h4>
                    <div class="tracker-food-meta">
                        Serving: ${food.serving_qty} ${food.serving_unit}
                    </div>
                    <div class="tracker-nutrition-facts">
                        <div class="tracker-nutrition-item">
                            <span>Calories:</span>
                            <span>${food.nf_calories || 'N/A'}</span>
                        </div>
                        <div class="tracker-nutrition-item">
                            <span>Protein:</span>
                            <span>${food.nf_protein || 'N/A'}g</span>
                        </div>
                        <div class="tracker-nutrition-item">
                            <span>Carbs:</span>
                            <span>${food.nf_total_carbohydrate || 'N/A'}g</span>
                        </div>
                        <div class="tracker-nutrition-item">
                            <span>Fat:</span>
                            <span>${food.nf_total_fat || 'N/A'}g</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        resultsContainer.innerHTML = `<div class="tracker-grid">${foodCards}</div>`;
    }

    // Calculate fitness metrics
    calculateMetrics() {
        const { age, weight, height, gender, activityLevel } = this.userData;
        
        if (!age || !weight || !height || !gender) {
            this.showMessage('Please complete your profile first to calculate metrics.', 'error');
            return;
        }

        const resultsContainer = document.getElementById('metrics-results');
        resultsContainer.innerHTML = '<div class="tracker-loading">Calculating your fitness metrics...</div>';

        // Simulate API call delay
        setTimeout(() => {
            // Calculate BMI
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            
            // Calculate BMR (Basal Metabolic Rate)
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            
            // Calculate daily calorie needs based on activity level
            const activityMultipliers = {
                'sedentary': 1.2,
                'light': 1.375,
                'moderate': 1.55,
                'active': 1.725,
                'very-active': 1.9
            };
            
            const dailyCalories = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
            
            // Calculate ideal weight range
            const minIdealWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
            const maxIdealWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
            
            // Display results
            resultsContainer.innerHTML = `
                <div class="tracker-metric-card">
                    <div class="tracker-metric-label">Body Mass Index (BMI)</div>
                    <div class="tracker-metric-value">${bmi}</div>
                    <div>${this.getBMICategory(bmi)}</div>
                </div>
                <div class="tracker-metric-card">
                    <div class="tracker-metric-label">Basal Metabolic Rate</div>
                    <div class="tracker-metric-value">${Math.round(bmr)}</div>
                    <div>calories/day</div>
                </div>
                <div class="tracker-metric-card">
                    <div class="tracker-metric-label">Daily Calorie Needs</div>
                    <div class="tracker-metric-value">${dailyCalories}</div>
                    <div>calories/day</div>
                </div>
                <div class="tracker-metric-card">
                    <div class="tracker-metric-label">Ideal Weight Range</div>
                    <div class="tracker-metric-value">${minIdealWeight} - ${maxIdealWeight}</div>
                    <div>kilograms</div>
                </div>
            `;
        }, 1500);
    }

    // Get BMI category
    getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    // Update scroll progress
    updateScrollProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const trackLength = docHeight - winHeight;
        const scrollBar = document.getElementById('tracker-scroll-bar');
        
        if (scrollBar) {
            const scrollPercentage = (scrollTop / trackLength) * 100;
            scrollBar.style.width = scrollPercentage + '%';
        }
    }

    // Show message to user
    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `tracker-${type}`;
        messageEl.textContent = message;
        
        // Insert after the current section's card
        const currentSection = document.querySelector('.tracker-nav a.active')?.getAttribute('href') || '#profile';
        const sectionCard = document.querySelector(`${currentSection} .tracker-card`);
        if (sectionCard) {
            sectionCard.after(messageEl);
        } else {
            document.querySelector(currentSection).appendChild(messageEl);
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    // Demo exercise database (fallback)
    // EXERCISE_DEMO_DATA = [
    //     {
    //         name: "Push-up",
    //         bodyPart: "chest",
    //         target: "pectorals",
    //         equipment: "body weight",
    //         gifUrl: "",
    //         instructions: [
    //             "Start in a plank position with hands shoulder-width apart",
    //             "Lower your body until chest nearly touches the floor",
    //             "Keep elbows close to your body",
    //             "Push back up to starting position"
    //         ]
    //     },
    //     {
    //         name: "Bodyweight Squat",
    //         bodyPart: "legs",
    //         target: "quads",
    //         equipment: "body weight",
    //         gifUrl: "",
    //         instructions: [
    //             "Stand with feet shoulder-width apart",
    //             "Lower your body as if sitting in a chair",
    //             "Keep chest up and back straight",
    //             "Go as low as comfortable, then return to standing"
    //         ]
    //     },
    //     {
    //         name: "Plank",
    //         bodyPart: "waist",
    //         target: "abs",
    //         equipment: "body weight",
    //         gifUrl: "",
    //         instructions: [
    //             "Start in push-up position but on elbows",
    //             "Keep body in straight line from head to heels",
    //             "Engage core and hold for desired time",
    //             "Don't let hips sag or rise too high"
    //         ]
    //     }
    // ];

    // // Demo nutrition data
    // NUTRITION_DATA = {
    //     "apple": { calories: 95, protein: 0.5, carbs: 26, fat: 0.3 },
    //     "banana": { calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    //     "chicken breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    //     "brown rice": { calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    //     "salmon": { calories: 206, protein: 22, carbs: 0, fat: 13 },
    //     "broccoli": { calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    //     "eggs": { calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
    //     "oatmeal": { calories: 158, protein: 6, carbs: 27, fat: 3.2 }
    // };
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const fitnessTracker = new FitnessTracker();
    
    // Pre-fill form if user data exists
    const userData = fitnessTracker.loadUserData();
    if (userData.age) {
        document.getElementById('age').value = userData.age;
        document.getElementById('gender').value = userData.gender;
        document.getElementById('weight').value = userData.weight;
        document.getElementById('height').value = userData.height;
        document.getElementById('activity-level').value = userData.activityLevel;
        document.getElementById('fitness-goals').value = userData.fitnessGoals;
    }

    // Load some sample exercises on page load
    setTimeout(() => {
        fitnessTracker.handleExerciseSearch();
    }, 1000);
});