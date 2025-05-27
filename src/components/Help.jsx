import React from 'react';

function Help() {
  return (
    <div className="mt-8 max-w-md text-left bg-yellow-100 p-4 rounded">
      <h3 className="font-bold text-lg mb-2">How to Play:</h3>
      <ul className="list-disc list-inside">
        <li>Each player selects an emoji category.</li>
        <li>Take turns placing a random emoji from your category on the 3x3 board.</li>
        <li>You can only have 3 emojis on the board at once.</li>
        <li>When placing a 4th emoji, the oldest one disappears (but not reused immediately).</li>
        <li>First player to align 3 of their own emojis wins!</li>
      </ul>
    </div>
  );
}

export default Help;
