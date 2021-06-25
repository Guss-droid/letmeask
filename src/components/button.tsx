import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss'

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ isOutlined = false , ...props }: Buttonprops) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} 
    {...props}
     />
  )
}