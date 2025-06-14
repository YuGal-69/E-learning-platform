import React from "react";
import "./Card.css";

const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hoverable = false,
  loading = false,
  ...props
}) => {
  const cardClasses = [
    "card",
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable ? "card-hoverable" : "",
    loading ? "card-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardContent = (
    <>
      {loading && (
        <div className="card-skeleton">
          <div className="card-skeleton-header" />
          <div className="card-skeleton-content">
            <div className="card-skeleton-line" />
            <div className="card-skeleton-line" />
            <div className="card-skeleton-line" />
          </div>
        </div>
      )}
      {!loading && children}
    </>
  );

  return (
    <div className={cardClasses} {...props}>
      {cardContent}
    </div>
  );
};

// Card Header Component
Card.Header = ({ children, className = "", ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

// Card Body Component
Card.Body = ({ children, className = "", ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

// Card Footer Component
Card.Footer = ({ children, className = "", ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

// Card Image Component
Card.Image = ({ src, alt, className = "", ...props }) => (
  <div className={`card-image ${className}`} {...props}>
    <img src={src} alt={alt} />
  </div>
);

export default Card;
