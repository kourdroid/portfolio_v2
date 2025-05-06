import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  subject,
  message,
}) => (
  <div style={{ 
    fontFamily: 'Inter, system-ui, sans-serif', 
    color: '#09090b', // shadcn foreground
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fafafa', // shadcn background
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }}>
    {/* Header */}
    <div style={{
      backgroundColor: 'hsl(240 5.9% 10%)', // shadcn primary background
      padding: '24px',
      textAlign: 'center' as const,
      color: 'white'
    }}>
      <h1 style={{ 
        margin: '0',
        fontSize: '24px',
        fontWeight: '600',
        letterSpacing: '-0.025em'
      }}>
        New Message
      </h1>
      <p style={{ 
        margin: '8px 0 0',
        fontSize: '14px',
        opacity: '0.8'
      }}>
        You've received a new contact form submission
      </p>
    </div>

    {/* Content */}
    <div style={{ padding: '24px', backgroundColor: 'white' }}>
      {/* Sender Info Card */}
      <div style={{ 
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'hsl(0 0% 98%)', // shadcn muted
        borderRadius: '8px',
        border: '1px solid hsl(240 5% 96%)' // shadcn border
      }}>
        <h2 style={{ 
          margin: '0 0 12px',
          fontSize: '16px',
          fontWeight: '600',
          color: 'hsl(240 6% 10%)' // shadcn foreground
        }}>
          Sender Information
        </h2>
        <div style={{ display: 'grid', gap: '8px' }}>
          <div>
            <div style={{ 
              fontSize: '13px',
              fontWeight: '500',
              color: 'hsl(240 3.8% 46.1%)' // shadcn muted-foreground
            }}>
              Name
            </div>
            <div style={{ 
              fontSize: '14px',
              marginTop: '4px',
              color: 'hsl(240 6% 10%)' // shadcn foreground
            }}>
              {firstName}
            </div>
          </div>
          
          <div>
            <div style={{ 
              fontSize: '13px',
              fontWeight: '500',
              color: 'hsl(240 3.8% 46.1%)' // shadcn muted-foreground
            }}>
              Email
            </div>
            <div style={{ 
              fontSize: '14px',
              marginTop: '4px'
            }}>
              <a href={`mailto:${email}`} style={{ 
                color: 'hsl(240 5.9% 10%)', // shadcn primary
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                {email}
              </a>
            </div>
          </div>
          
          <div>
            <div style={{ 
              fontSize: '13px',
              fontWeight: '500',
              color: 'hsl(240 3.8% 46.1%)' // shadcn muted-foreground
            }}>
              Subject
            </div>
            <div style={{ 
              fontSize: '14px',
              marginTop: '4px',
              color: 'hsl(240 6% 10%)' // shadcn foreground
            }}>
              {subject}
            </div>
          </div>
        </div>
      </div>

      {/* Message Card */}
      <div style={{ 
        marginBottom: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid hsl(240 5% 96%)' // shadcn border
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid hsl(240 5% 96%)', // shadcn border
          display: 'flex',
          alignItems: 'center'
        }}>
          <h2 style={{ 
            margin: '0',
            fontSize: '16px',
            fontWeight: '600',
            color: 'hsl(240 6% 10%)' // shadcn foreground
          }}>
            Message
          </h2>
        </div>
        <div style={{ 
          padding: '16px',
          fontSize: '14px',
          lineHeight: '1.6',
          whiteSpace: 'pre-line' as const,
          color: 'hsl(240 4% 16%)' // shadcn foreground
        }}>
          {message}
        </div>
      </div>

      {/* Reply Button */}
      <div style={{ textAlign: 'center' as const, margin: '24px 0 8px' }}>
        <a 
          href={`mailto:${email}?subject=Re: ${subject}`}
          style={{
            display: 'inline-block',
            padding: '10px 16px',
            backgroundColor: 'hsl(240 5.9% 10%)', // shadcn primary
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '14px',
            textAlign: 'center' as const,
            transition: 'background-color 150ms ease',
            cursor: 'pointer'
          }}
        >
          Reply to {firstName}
        </a>
      </div>
    </div>

    {/* Footer */}
    <div style={{ 
      padding: '16px',
      backgroundColor: 'hsl(0 0% 98%)', // shadcn muted
      textAlign: 'center' as const,
      fontSize: '12px',
      color: 'hsl(240 3.8% 46.1%)' // shadcn muted-foreground
    }}>
      <p style={{ margin: '0' }}>
        This email was sent from your portfolio contact form.
      </p>
    </div>
  </div>
);