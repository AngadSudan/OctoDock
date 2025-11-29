import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Github,
  Lock,
  Users,
  Mail,
  RefreshCcw,
  Timer,
  Database,
  ChevronRight,
  Zap,
  Cpu,
  DatabaseZap,
  ExternalLink,
} from "lucide-react";
import { Helmet } from "react-helmet";
export type BrandTheme = {
  primary?: string;
  primarySoft?: string;
  surface?: string;
  background?: string;
  gradientFrom?: string;
  gradientTo?: string;
};

export type PrivacyPolicyProps = {
  companyName?: string;
  effectiveDate?: string;
  contactEmail?: string;
  theme?: BrandTheme;
};

// --- Theme and Utility ---

const defaultTheme: Required<BrandTheme> = {
  primary: "rose-500",
  primarySoft: "rose-500/10",
  surface: "#11161d",
  background: "#0b0f14",
  gradientFrom: "rose-500",
  gradientTo: "red-500",
};

const cx = (...cls: (string | false | undefined)[]) =>
  cls.filter(Boolean).join(" ");

// --- Components ---

const HudCard = ({ title, subtitle, icon }: any) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={cx(
      "relative rounded-2xl p-5 border border-rose-500/20 bg-gradient-to-b from-white/5 to-white/0",
      "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_40px_-20px_rgba(0,0,0,0.6)]",
      "overflow-hidden hover:border-rose-500/50 transition duration-300"
    )}
  >
    {/* Corner Brackets */}
    {[
      "left-2 top-2",
      "right-2 top-2 rotate-90",
      "left-2 bottom-2 -rotate-90",
      "right-2 bottom-2 rotate-180",
    ].map((pos, i) => (
      <span
        key={i}
        className={`absolute h-3 w-3 border-t border-l border-rose-400/60 ${pos}`}
      />
    ))}

    <div className="flex items-center gap-3">
      <span className="text-rose-400">{icon}</span>
      <div>
        <p className="text-[10px] tracking-widest text-rose-300/80 uppercase">
          Status: Online
        </p>
        <h4 className="text-slate-100 font-semibold text-lg">{title}</h4>
      </div>
    </div>
    {subtitle && (
      <p className="mt-1 text-xs text-slate-400/80 uppercase">{subtitle}</p>
    )}
  </motion.div>
);

const SectionHeading = ({ id, icon, children }: any) => (
  <h3
    id={id}
    className="group scroll-mt-28 text-xl md:text-2xl font-semibold text-slate-100 mt-10 mb-6 flex items-center gap-3 border-b border-rose-500/10 pb-2"
  >
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-rose-900/50 shadow-md">
      {icon}
    </span>
    {children}
    <a
      href={`#${id}`}
      className="opacity-0 group-hover:opacity-100 transition ml-1 text-rose-400 text-base"
    >
      #
    </a>
  </h3>
);

// --- Main Component ---

export default function PrivacyPolicy({
  companyName = "OctoDock",
  effectiveDate = "2025-01-01",
  contactEmail = "privacy@example.com",
  theme: tOverrides,
}: PrivacyPolicyProps) {
  const t = { ...defaultTheme, ...(tOverrides || {}) };

  return (
    <main
      aria-labelledby="pp-title"
      className="min-h-screen text-slate-300 antialiased font-sans"
      style={{ background: t.background }}
    >
      <Helmet>
        <title>
          Privacy Policy | Octodock – Data Protection & User Security
        </title>

        <meta
          name="description"
          content="Read the Octodock Privacy Policy to understand how we protect your data, manage containerized environments securely, and maintain compliance across our globally distributed computing infrastructure."
        />

        <meta
          name="keywords"
          content="Octodock privacy policy, data protection, user privacy, security practices, compliance, data handling, distributed computing security"
        />

        {/* Allow indexing — this is a public legal page */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Octodock Privacy Policy" />
        <meta
          property="og:description"
          content="Learn how Octodock safeguards user data, secures containerized workflows, and ensures compliance across global edge and distributed computing networks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>

      {/* GLOW BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(21,115,140,0.22) 0%, rgba(11,15,20,0) 60%), radial-gradient(50% 50% at 80% 20%, rgba(244,63,94,0.08) 0%, rgba(11,15,20,0) 55%)",
          maskImage:
            "radial-gradient(100% 100% at 50% 50%, black 70%, transparent 100%)",
        }}
      />

      {/* SCANLINES */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
          mixBlendMode: "overlay",
        }}
      />

      {/* TOP STRIP */}
      <div className="border-b border-white/5 bg-black/20 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 border border-rose-400/30">
              <Github className="text-rose-300" size={18} />
            </span>
            <p className="text-sm tracking-wider text-slate-200">
              GITHUB OAUTH POLICY
            </p>
          </div>
          <p className="text-[11px] tracking-widest text-rose-300/80">
            EFFECTIVE: {new Date(effectiveDate).toDateString()}
          </p>
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <h1
                id="pp-title"
                className="text-4xl md:text-6xl font-extrabold text-white"
                style={{ textShadow: "0 0 18px rgba(244,63,94,0.45)" }}
              >
                PRIVACY POLICY
              </h1>
              <p className="mt-3 text-lg text-rose-400 tracking-wider">
                <span className="text-slate-400">Section for </span>
                <strong>GitHub OAuth Integration</strong>
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <HudCard
                title="Token Security"
                subtitle="Hashed & Verified"
                icon={<Cpu size={18} />}
              />
              <HudCard
                title="Scoped Access"
                subtitle="Minimal Permissions"
                icon={<Zap size={18} />}
              />
              <HudCard
                title="Data Retention"
                subtitle="Temporary & Minimal"
                icon={<DatabaseZap size={18} />}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN BODY — FIXED NON‑OVERLAPPING */}
      <section className="relative pb-20 z-10">
        {/* Updated grid to single column for full width content */}
        <div className="mx-auto max-w-6xl px-4 grid items-start grid-cols-1 gap-12">
          {/* CONTENT */}
          {/* Removed lg:col-span-1 for full width */}
          <article className="prose prose-invert max-w-none min-w-0 z-10 prose-p:leading-relaxed prose-li:marker:text-rose-300 prose-a:text-rose-400 hover:prose-a:text-rose-300">
            {/* Section 1: Information We Collect Through GitHub OAuth */}
            <SectionHeading id="info-we-collect" icon={<Users size={18} />}>
              1. Information We Collect Through GitHub OAuth
            </SectionHeading>
            <p>
              When you sign in to <strong>{companyName}</strong> using GitHub
              OAuth, we receive certain information from GitHub based on the
              permissions you grant. This may include:
            </p>
            <ul>
              <li>
                Your public GitHub profile information (e.g., username, avatar,
                profile URL, public email if available).
              </li>
              <li>
                An OAuth access token that, depending on the scopes you approve,
                <em>may</em> allow access to private repositories and other
                private data.
              </li>
            </ul>

            {/* Section 2: How We Use GitHub OAuth Data */}
            <SectionHeading id="how-we-use" icon={<Github size={18} />}>
              2. How We Use GitHub OAuth Data
            </SectionHeading>
            <p>
              We use data obtained via GitHub OAuth only to provide and improve
              the features you request on our website, for account
              authentication, and for any repository-related functionality you
              explicitly enable.
            </p>

            {/* Section 3: Token Storage and Security */}
            <SectionHeading id="token-storage" icon={<Lock size={18} />}>
              3. Token Storage and Security
            </SectionHeading>
            <p>
              For security, the raw GitHub OAuth access token is{" "}
              <strong>not</strong>
              stored in plain text. Instead:
            </p>
            <ul>
              <li>
                We <strong>hash</strong> the OAuth access token before storing
                it in our database.
              </li>
              <li>
                We do not have access to the original (raw) access token after
                authorization.
              </li>
              <li>
                The hashed token cannot be used directly to authenticate with
                GitHub; its purpose is for internal verification only.
              </li>
            </ul>

            {/* Section 4: Access to Private Repositories */}
            <SectionHeading id="private-repos" icon={<Database size={18} />}>
              4. Access to Private Repositories
            </SectionHeading>
            <p>
              If you grant scopes that allow access to private repositories, we
              may access repository metadata or contents only as necessary to
              provide the services you request.
            </p>
            <ul>
              <li>
                We do not persistently store private repository contents unless
                explicitly required and disclosed to you.
              </li>
              <li>
                Any processing of private repository data is performed securely
                and limited to the minimum necessary for functionality.
              </li>
            </ul>

            {/* Section 5: Revoking Access */}
            <SectionHeading
              id="revoking-access"
              icon={<RefreshCcw size={18} />}
            >
              5. Revoking Access
            </SectionHeading>
            <p>
              You can revoke our application's access to your GitHub account at
              any time through your GitHub settings:
              <a
                href="https://github.com/settings/applications"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://github.com/settings/applications{" "}
                <ExternalLink size={16} className="inline ml-1" />
              </a>
              . Once revoked, our website will no longer be able to interact
              with your GitHub data.
            </p>

            {/* Section 6: Data Retention */}
            <SectionHeading id="data-retention" icon={<Timer size={18} />}>
              6. Data Retention
            </SectionHeading>
            <p>
              We retain only the information necessary for your account and the
              features you use:
            </p>
            <ul>
              <li>
                Hashed tokens and basic profile information may be retained
                until you delete your account or request removal.
              </li>
              <li>
                We do not retain raw OAuth tokens or private repository data
                beyond what is necessary for the service, unless explicitly
                stated otherwise.
              </li>
            </ul>

            {/* Section 7: How We Protect Your Data */}
            <SectionHeading id="protection" icon={<ShieldCheck size={18} />}>
              7. How We Protect Your Data
            </SectionHeading>
            <p>
              We implement industry-standard security measures to protect the
              information we hold, including:
            </p>
            <ul>
              <li>Transport-layer encryption (HTTPS) for data in transit.</li>
              <li>Hashing of OAuth tokens before storage.</li>
              <li>
                Access controls and restricted-database permissions for
                sensitive data.
              </li>
            </ul>

            {/* Section 8: Sharing and Third Parties */}
            <SectionHeading id="sharing" icon={<Users size={18} />}>
              8. Sharing and Third Parties
            </SectionHeading>
            <p>
              We do not sell or share your OAuth tokens or GitHub data to third
              parties except:
            </p>
            <ul>
              <li>
                Where required to provide a requested service (e.g., invoking
                GitHub APIs on your behalf).
              </li>
              <li>
                When legally required or to protect rights, safety, or property.
              </li>
            </ul>

            {/* Section 9: Your Rights */}
            <SectionHeading id="rights" icon={<Mail size={18} />}>
              9. Your Rights and Contact
            </SectionHeading>
            <p>
              Depending on your jurisdiction, you may have rights to access,
              correct, or delete your personal data. To exercise those rights or
              for privacy inquiries, contact us via email at{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <div className="mt-12 pt-6 border-t border-rose-500/10 text-center text-sm text-slate-400/80">
              <p>
                This GitHub OAuth Policy section is part of the overall{" "}
                <a href="#" className="text-rose-400 hover:text-white">
                  {companyName} Privacy Policy
                </a>
                .
              </p>
              <p className="mt-2 text-xs">
                Data Security Protocol: Active & Monitored.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
