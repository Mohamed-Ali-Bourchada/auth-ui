# Auth UI - Modern Authentication Template

A beautiful, responsive authentication UI template built with Angular, Tailwind CSS, and Angular Material. This template provides a modern and sleek authentication experience with animated UI elements, form validation, and a clean design.

![Auth Dashboard Preview](public/screenshots/preview.png)

## Features

- 🎨 **Modern UI Design** - Clean, professional design with smooth animations and transitions
- 🔒 **Complete Authentication Flows** - Login, signup, and password recovery screens
- 📱 **Fully Responsive** - Works beautifully on all device sizes
- ✅ **Form Validation** - Built-in validation for all form fields
- 🎭 **Animation Effects** - Gradient backgrounds, subtle hover states, and loading animations
- 🔄 **Social Authentication** - Ready-to-integrate social login buttons (Google, GitHub)
- 🛠️ **Built with Angular & Tailwind** - Leveraging modern web technologies

## Authentication Pages

### Login Page

- Email/password authentication
- Social login options (Google, GitHub, SSO)
- Remember me functionality
- Password recovery link
- Form validation with error messages
- Loading state animation

### Signup Page

- New user registration
- Name, email, and password fields
- Terms and conditions acceptance
- Social signup options
- Form validation with error messages
- Loading state animation

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- Angular CLI

### Installation

1. Clone the repository or download the template
2. Install dependencies:

```bash
cd auth-ui
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Customization

The template is built with customization in mind:

- **Colors**: Update the color scheme in `tailwind.config.js` and `styles.scss`
- **Animations**: Modify animations in `styles.scss`
- **Form Fields**: Easily add or remove fields in the authentication components
- **Logo**: Replace the logo in the authentication pages

## Integration with Authentication Providers

This template can be easily integrated with various authentication providers:

1. **Firebase Authentication**
2. **Auth0**
3. **AWS Cognito**
4. **Keycloak**
5. **Custom authentication backend**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
