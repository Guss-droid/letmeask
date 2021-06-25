import { ReactNode } from 'react';

import cx from 'classnames';

import '../styles/question.scss'

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighLighted?: boolean;
  isAnswered?: boolean;
}

export function Questions({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: QuestionsProps) {
  return (
    <div className={cx('question',
      { answered: isAnswered },
      { highLighted: isHighLighted && !isAnswered },
    )}>
      <p>{content}</p>

      <footer>
        <div className="userInfo">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
}