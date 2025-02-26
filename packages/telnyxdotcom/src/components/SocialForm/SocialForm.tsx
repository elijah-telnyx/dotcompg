import GoogleGsiSignUpForm from 'components/GoogleGsiSignUpForm';
import MicrosoftSignUpForm from 'components/MicrosoftSignUpForm';
import * as css from './SocialForm.styled';

export interface SocialFormProps {
  sift_session_id: string;
  promo_code?: string;
}

const SocialForm = ({ promo_code, sift_session_id }: SocialFormProps) => {
  return (
    <css.Wrapper>
      <>
        <GoogleGsiSignUpForm promo_code={promo_code} sift_session_id={sift_session_id} />
        <MicrosoftSignUpForm
          promo_code={promo_code}
          sift_session_id={sift_session_id}
          buttonKind='microsoft'
          loadingWidth={0}
        >
          Sign up with Microsoft
        </MicrosoftSignUpForm>
      </>
    </css.Wrapper>
  );
};

export default SocialForm;
