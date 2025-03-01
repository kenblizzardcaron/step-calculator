document.addEventListener('DOMContentLoaded', () => {
    const stepGoalInput = document.getElementById('stepGoal');
    const currentStepsInput = document.getElementById('currentSteps');
    const strideLengthInput = document.getElementById('strideLength');
    const heightInput = document.getElementById('height'); // New input for height
    const remainingStepsDisplay = document.getElementById('remainingSteps');
    const halfwayStepsDisplay = document.getElementById('halfwaySteps');
    const stepsToHalfwayDisplay = document.getElementById('stepsToHalfway');
    const distanceToGoalDisplay = document.getElementById('distanceToGoal');

    function calculateSteps() {
        const stepGoal = parseInt(stepGoalInput.value) || 0;
        const currentSteps = parseInt(currentStepsInput.value) || 0;
        const strideLength = parseFloat(strideLengthInput.value) || estimateStrideLength();
        const remainingSteps = stepGoal - currentSteps;
        const halfwaySteps = currentSteps + Math.ceil(remainingSteps / 2);
        const stepsToHalfway = Math.ceil(remainingSteps / 2);
        const strideLengthInMeters = strideLength * 0.0254; // Convert inches to meters
        const distanceToGoalInMeters = remainingSteps * strideLengthInMeters;
        const distanceToGoalInMiles = distanceToGoalInMeters / 1609.34; // Convert meters to miles

        remainingStepsDisplay.textContent = `Remaining Steps: ${remainingSteps}`;
        halfwayStepsDisplay.textContent = `Halfway Point Steps: ${halfwaySteps}`;
        stepsToHalfwayDisplay.textContent = `Steps to Halfway Point: ${stepsToHalfway}`;
        distanceToGoalDisplay.textContent = `Distance to Goal: ${distanceToGoalInMiles.toFixed(2)} miles`;
    }

    function estimateStrideLength() {
        const height = parseFloat(heightInput.value) || 0;
        return height * 0.413; // Estimate stride length as 41.3% of height
    }

    function updateStrideLength() {
        const estimatedStrideLength = estimateStrideLength();
        strideLengthInput.value = estimatedStrideLength.toFixed(2);
    }

    function saveToLocalStorage() {
        localStorage.setItem('stepGoal', stepGoalInput.value);
        localStorage.setItem('currentSteps', currentStepsInput.value);
        localStorage.setItem('strideLength', strideLengthInput.value);
        localStorage.setItem('height', heightInput.value); // Save height to local storage
    }

    function loadFromLocalStorage() {
        const stepGoal = localStorage.getItem('stepGoal');
        const currentSteps = localStorage.getItem('currentSteps');
        const strideLength = localStorage.getItem('strideLength');
        const height = localStorage.getItem('height'); // Load height from local storage

        if (stepGoal !== null) {
            stepGoalInput.value = stepGoal;
        }
        if (currentSteps !== null) {
            currentStepsInput.value = currentSteps;
        }
        if (strideLength !== null) {
            strideLengthInput.value = strideLength;
        }
        if (height !== null) {
            heightInput.value = height;
            updateStrideLength();
        }
    }

    stepGoalInput.addEventListener('input', () => {
        calculateSteps();
        saveToLocalStorage();
    });

    currentStepsInput.addEventListener('input', () => {
        calculateSteps();
        saveToLocalStorage();
    });

    strideLengthInput.addEventListener('input', () => {
        calculateSteps();
        saveToLocalStorage();
    });

    heightInput.addEventListener('input', () => {
        updateStrideLength();
        calculateSteps();
        saveToLocalStorage();
    });

    loadFromLocalStorage();
    calculateSteps();
});
