import React from "react";
import "../../styles/authPages.css";

function AuthLayout({
  badge,
  icon,
  title,
  subtitle,
  children,
  footer,
  wide = false,
}) {
  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      <div className={`auth-card ${wide ? "auth-card-wide" : ""}`}>
        {icon && <div className="auth-icon-wrap">{icon}</div>}
        {badge && <div className="auth-badge">{badge}</div>}
        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthLayout;
