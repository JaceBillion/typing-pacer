import React from 'react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto px-6 py-12 md:py-24 min-h-[calc(100vh-4rem-5rem)]"
    >
      <h1 className="text-4xl font-bold text-lavender-accent mb-4">Privacy Policy</h1>
      <p className="text-frosted-text/50 mb-8 text-sm">Last Updated: March 2, 2026</p>
      
      <div className="space-y-8 text-frosted-text/80 leading-relaxed text-lg">
        <section>
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">1. Introduction</h2>
          <p>
            Welcome to Typing Pacer. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            <strong>Local Data:</strong> To provide a seamless experience, Typing Pacer stores your typing statistics, 
            preferences, and custom themes locally on your device using your browser's Local Storage. This data is not 
            transmitted to our servers.
          </p>
          <p>
            <strong>Usage Data:</strong> We may collect non-personally identifiable information about how the website is 
            accessed and used. This may include your browser type, device type, pages visited, and the time and date of your visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">3. Cookies and Third-Party Services</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            <strong>Advertisements:</strong> We use third-party advertising companies to serve ads when you visit our website. 
            These companies may use aggregated information (not including your name, address, email address, or telephone number) 
            about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">4. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, 
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect 
            your personal data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last Updated" date at the top.
          </p>
        </section>

        <section className="pt-8 border-t border-white/5 mt-8">
          <h2 className="text-2xl font-semibold text-frosted-text mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via X (formerly Twitter) at 
            <a href="https://x.com/typingpacer" target="_blank" rel="noopener noreferrer" className="text-lavender-accent hover:underline ml-1">@typingpacer</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
