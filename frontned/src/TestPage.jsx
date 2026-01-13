import React from 'react';

const TestPage = () => {
    return (
        <div style={{
            padding: '40px',
            textAlign: 'center',
            fontFamily: 'system-ui'
        }}>
            <h1>✅ Server is Working!</h1>
            <p>If you see this, your dev server is running correctly.</p>
            <p>The 404 error was likely from:</p>
            <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                <li>Wrong URL (use http://localhost:5173)</li>
                <li>Missing chart.js package</li>
                <li>Wrong route path</li>
            </ul>
            <hr style={{ margin: '40px 0' }} />
            <p><strong>Next Steps:</strong></p>
            <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                <li>Make sure chart.js is installed: <code>npm install chart.js</code></li>
                <li>Navigate to: <code>http://localhost:5173</code></li>
                <li>Check browser console for errors</li>
            </ol>
        </div>
    );
};

export default TestPage;
