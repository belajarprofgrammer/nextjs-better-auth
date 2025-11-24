import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ResetPasswordTemplate({
  name,
  url,
  token,
}: {
  name: string;
  url: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>Reset your password</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://react-email-demo-a56qh2fdt-resend.vercel.app/static/vercel-logo.png"
                width="40"
                height="33"
                alt="Vercel Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Reset your password
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello <strong>{name}</strong>,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              You are receiving this email because we received a password reset
              request for your account.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button href={url} className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline">
                Reset Password
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              This password reset link will expire in 60 minutes.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              If you did not request a password reset, no further action is required.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Regards,
              <br />
              NextJS
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you&apos;re having trouble clicking the "Reset Password" button, copy
              and paste the URL below into your web browser:{' '}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
