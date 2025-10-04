document.getElementById('generateCode').addEventListener('click', function() {
    // Function to generate a random shark card code
    function generateSharkCardCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 12; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    // Function to check the validity of the shark card code
    async function checkSharkCardCode(code) {
        try {
            const response = await fetch(`https://services.rockstargames.com/sharkcard/check?code=${code}`);
            const data = await response.json();
            return data.valid;
        } catch (error) {
            console.error('Error checking code:', error);
            return false;
        }
    }

    // Generate a new shark card code
    const newCode = generateSharkCardCode();
    document.getElementById('codeDisplay').innerText = `Generated Shark Card Code: ${newCode}`;

    // Check the validity of the generated code
    checkSharkCardCode(newCode).then(valid => {
        if (valid) {
            document.getElementById('statusMessage').innerText = `The code ${newCode} is valid!`;
            document.getElementById('statusMessage').style.color = 'green';
        } else {
            document.getElementById('statusMessage').innerText = `The code ${newCode} is invalid.`;
            document.getElementById('statusMessage').style.color = 'red';
        }
    });
});
