import styled from 'styled-components'

const ContactStyles = styled.form`
  .mapleSyrup {
    display: none;
  }

  .form-item-honeypot {
    display: none;
  }

  .form {
    max-width: 100%;
    width: 25rem;
    margin: 0 auto;
  }

  .form-item label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .form-item input {
    height: 2.5rem;
    text-indent: 0.75rem;
    padding: 0;
  }

  .form-item textarea {
    height: 8rem;
    padding: 0.75rem;
    overflow: auto;
    padding: 0;
  }

  .form-item input,
  .form-item textarea {
    width: 100%;
    margin-bottom: 15px;
    -webkit-transition: all 0.7s ease;
    transition: all 0.7s ease;
    border: 1px solid #ccc;
    outline: 0;
    font-size: 0.7rem;
  }

  .form-item:last-child {
    margin: 1rem 0 2rem 0;
  }

  .form-btn {
    width: 100%;
    margin: 0 auto;
    display: inherit;
    font-size: 0.8rem;
    text-transform: uppercase;
    padding: 1rem 1.5rem;
    color: #fff;
    background: #15f3a8;
    border: 0;
    border-radius: 0;
    outline: 0;
    letter-spacing: 2px;
    cursor: pointer;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
  }

  .form-btn:hover {
    background-color: #1bdc9b;
  }
`

export default ContactStyles
