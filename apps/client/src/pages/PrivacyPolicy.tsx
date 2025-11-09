function PrivacyPolicy({
  companyName = "Your Company",
  effectiveDate = "2025-01-01",
  contactEmail = "privacy@example.com",
}: {
  companyName?: string;
  effectiveDate?: string;
  contactEmail?: string;
}) {
  return (
    <section id="privacy-policy-github-oauth" aria-labelledby="pp-github-title">
      <h2 id="pp-github-title">Privacy Policy — GitHub OAuth</h2>

      <p>
        <strong>Effective date:</strong>{" "}
        <time dateTime={effectiveDate}>{effectiveDate}</time>
      </p>

      <h3>1. Information We Collect Through GitHub OAuth</h3>
      <p>
        When you sign in to {companyName} using GitHub OAuth, we receive certain
        information from GitHub based on the permissions you grant. This may
        include:
      </p>
      <ul>
        <li>
          Your public GitHub profile information (e.g., username, avatar,
          profile URL, public email if available).
        </li>
        <li>
          An OAuth access token that, depending on the scopes you approve,{" "}
          <em>may</em> allow access to private repositories and other private
          data.
        </li>
      </ul>

      <h3>2. How We Use GitHub OAuth Data</h3>
      <p>
        We use data obtained via GitHub OAuth only to provide and improve the
        features you request on our website, for account authentication, and for
        any repository-related functionality you explicitly enable.
      </p>

      <h3>3. Token Storage and Security</h3>
      <p>
        For security, the raw GitHub OAuth access token is <strong>not</strong>{" "}
        stored in plain text. Instead:
      </p>
      <ul>
        <li>
          We <strong>hash</strong> the OAuth access token before storing it in
          our database.
        </li>
        <li>
          We do not have access to the original (raw) access token after
          authorization.
        </li>
        <li>
          The hashed token cannot be used directly to authenticate with GitHub;
          its purpose is for internal verification only.
        </li>
      </ul>

      <h3>4. Access to Private Repositories</h3>
      <p>
        If you grant scopes that allow access to private repositories, we may
        access repository metadata or contents only as necessary to provide the
        services you request.
      </p>
      <ul>
        <li>
          We do not persistently store private repository contents unless
          explicitly required and disclosed to you.
        </li>
        <li>
          Any processing of private repository data is performed securely and
          limited to the minimum necessary for functionality.
        </li>
      </ul>

      <h3>5. Revoking Access</h3>
      <p>
        You can revoke our application's access to your GitHub account at any
        time through your GitHub settings:
        <a
          href="https://github.com/settings/applications"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/settings/applications
        </a>
        . Once revoked, our website will no longer be able to interact with your
        GitHub data.
      </p>

      <h3>6. Data Retention</h3>
      <p>
        We retain only the information necessary for your account and the
        features you use:
      </p>
      <ul>
        <li>
          Hashed tokens and basic profile information may be retained until you
          delete your account or request removal.
        </li>
        <li>
          We do not retain raw OAuth tokens or private repository data beyond
          what is necessary for the service, unless explicitly stated otherwise.
        </li>
      </ul>

      <h3>7. How We Protect Your Data</h3>
      <p>
        We implement industry-standard security measures to protect the
        information we hold, including:
      </p>
      <ul>
        <li>Transport-layer encryption (HTTPS) for data in transit.</li>
        <li>Hashing of OAuth tokens before storage.</li>
        <li>
          Access controls and restricted-database permissions for sensitive
          data.
        </li>
      </ul>

      <h3>8. Sharing and Third Parties</h3>
      <p>
        We do not sell or share your OAuth tokens or GitHub data to third
        parties except:
      </p>
      <ul>
        <li>
          Where required to provide a requested service (e.g., invoking GitHub
          APIs on your behalf).
        </li>
        <li>
          When legally required or to protect rights, safety, or property.
        </li>
      </ul>

      <h3>9. Your Rights</h3>
      <p>
        Depending on your jurisdiction, you may have rights to access, correct,
        or delete your personal data. To exercise those rights or for privacy
        inquiries, contact us at{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <hr />

      <p style={{ fontSize: "0.9em", color: "#555" }}>
        If you have questions about this section of our Privacy Policy, please
        contact {companyName} at{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </section>
  );
}

export default PrivacyPolicy;
