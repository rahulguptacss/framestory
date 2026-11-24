import React from 'react';

export function SocialIcon({
  name,
  className = 'h-4 w-4',
}: {
  name: string;
  className?: string;
}) {
  const n = name.toLowerCase();

  // Facebook
  if (n.includes('face') || n.includes('fb')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.458.172-1.782.531-.387.429-.496 1.053-.496 2.08v1.368h3.917l-.544 3.667h-3.373v7.98H9.101z" />
      </svg>
    );
  }

  // Instagram
  if (n.includes('insta')) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  // YouTube
  if (n.includes('you') || n.includes('yt')) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    );
  }

  // LinkedIn
  if (n.includes('link') || n.includes('in')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
