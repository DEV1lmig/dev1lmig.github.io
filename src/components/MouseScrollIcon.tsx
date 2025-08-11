import { motion } from 'framer-motion'

interface MouseScrollIconProps {
  className?: string
}

export const MouseScrollIcon = ({ className }: MouseScrollIconProps) => {
  return (
    <div className={`mouse-icon ${className || ''}`} aria-hidden="true">
      <svg
        className="w-4 h-6 md:w-5 md:h-8 lg:w-6 lg:h-9"
        viewBox="0 0 19 30"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Up arrow (kept subtle) */}
        <motion.path
          d="M9.5 2 L7.6 3.9 H11.4 L9.5 2 Z"
          fill="currentColor"
          initial={{ opacity: 0.25, y: 1 }}
          animate={{ opacity: [0.25, 0.9, 0.25], y: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Mouse outline (original) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.875 20.625V9.375C16.875 7.38588 16.0848 5.47822 14.6783 4.0717C13.2718 2.66518 11.3641 1.875 9.375 1.875C7.38588 1.875 5.47822 2.66518 4.0717 4.0717C2.66518 5.47822 1.875 7.38588 1.875 9.375V20.625C1.875 22.6141 2.66518 24.5218 4.0717 25.9283C5.47822 27.3348 7.38588 28.125 9.375 28.125C11.3641 28.125 13.2718 27.3348 14.6783 25.9283C16.0848 24.5218 16.875 22.6141 16.875 20.625ZM9.375 0C6.8886 0 4.50403 0.98772 2.74587 2.74587C0.98772 4.50403 0 6.8886 0 9.375V20.625C0 23.1114 0.98772 25.496 2.74587 27.2541C4.50403 29.0123 6.8886 30 9.375 30C11.8614 30 14.246 29.0123 16.0041 27.2541C17.7623 25.496 18.75 23.1114 18.75 20.625V9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.98772 11.8614 0 9.375 0Z"
          fill="currentColor"
          className="mouse"
        />

        {/* Inner scroll bar (original) */}
        <motion.path
          d="M10.0379 7.39959C9.8621 7.22377 9.62364 7.125 9.375 7.125C9.12636 7.125 8.8879 7.22377 8.71209 7.39959C8.53627 7.5754 8.4375 7.81386 8.4375 8.0625V11.8125C8.4375 12.0611 8.53627 12.2996 8.71209 12.4754C8.8879 12.6512 9.12636 12.75 9.375 12.75C9.62364 12.75 9.8621 12.6512 10.0379 12.4754C10.2137 12.2996 10.3125 12.0611 10.3125 11.8125V8.0625C10.3125 7.81386 10.2137 7.5754 10.0379 7.39959Z"
          fill="currentColor"
          className="cursor"
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Down arrow (kept subtle) */}
        <motion.path
          d="M9.5 28 L11.4 26.1 H7.6 L9.5 28 Z"
          fill="currentColor"
          initial={{ opacity: 0.25, y: -1 }}
          animate={{ opacity: [0.25, 0.9, 0.25], y: [-1, 0, -1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>
    </div>
  )
}