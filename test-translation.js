const testTranslation = async () => {
  try {
    console.log('Testing translation API...');
    
    const response = await fetch('http://localhost:3002/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceText: 'Hello world',
        selectedLanguage: 'Spanish'
      })
    });

    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Translation successful:', data.data);
    } else {
      console.log('❌ Translation failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testTranslation();

