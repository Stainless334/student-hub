import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

function Settings({ displayName, setDisplayName }) {
  const [nameInput, setNameInput] = useState(displayName);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and customise your experience.</p>
      </div>

      <section className="settings-card">
        <h2>Profile Settings</h2>
        <p>Update the name displayed on your dashboard.</p>

        <form
          className="settings-form"
          onSubmit={(event) => {
            event.preventDefault();
            setDisplayName(nameInput.trim());
          }}
        >
          <label htmlFor="displayName">Display Name</label>

          <input
            id="displayName"
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Enter your name"
          />

          <button type="submit">Save Profile</button>
        </form>

        <p className="current-profile">
          Current profile: <strong>{displayName || "No name saved"}</strong>
        </p>
      </section>

      <section className="settings-card">
        <h2>Appearance</h2>
        <p>Choose how StudentHub looks on your device.</p>

        <div className="appearance-control">
          <span>Dark Mode</span>
          <ThemeToggle />
        </div>
      </section>
    </div>
  );
}

export default Settings;