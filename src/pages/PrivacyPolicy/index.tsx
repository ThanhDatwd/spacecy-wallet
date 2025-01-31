import React, { useContext, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';

export default function PrivacyPolicy() {
	const { innerWidth } = useContext(SizeContext);
	const MaxWidth = innerWidth < 1800 ? '1440px' : '1600px';
	const fontSize = innerWidth < 1024 ? '13px' : '16px';
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<Box
			sx={{
				px: 5,
				mt: 15,
				mb: 4,
				maxWidth: MaxWidth,
				mx: 'auto',
				'& p': {
					fontSize: fontSize,
				},
			}}
		>
			<Typography
				sx={{ fontWeight: '600' }}
				variant="h2"
				align="center"
				component="h2"
				gutterBottom
			>
				Privacy Policy
			</Typography>
			<Typography align="center" gutterBottom>
				Updated on October 10, 2022.
			</Typography>
			<Divider variant="middle" sx={{ m: 4 }} />
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>Metaspacecy</strong> PRIVACY POLICY IMPORTANT: BY USING METASPACECY
				("COMPANY" OR "WE") SERVICES, INCLUDING WITHOUT LIMITATION ANY OF ITS APPLICATIONS
				OR WEBSITES (THE "SERVICES") YOU CONSENT TO THE TERMS AND CONDITIONS OF THIS PRIVACY
				POLICY AND CONSENT THAT ALL PERSONALLY IDENTIFIABLE INFORMATION ("PII") THAT YOU
				SUBMIT OR THAT IS PROCESSED OR COLLECTED THROUGH THE SERVICES MAY BE PROCESSED BY
				THE COMPANY IN THE MANNER AND FOR THE PURPOSES DESCRIBED IN THE FOLLOWING PRIVACY
				POLICY.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS SET FORTH HEREIN PLEASE DO NOT USE
				THE SERVICES.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				At <strong>Metaspacecy</strong>, we recognize that privacy is important. This policy
				applies to all of the software, services, information, tools, features, and
				functionality available on the Services offered by the Company or its subsidiaries
				or affiliated companies and covers how PII that the Company collects and receives,
				including in respect of any use of the Services, is treated. If you have any
				questions about this policy, please feel free to contact us at:{' '}
				<a href="mailto: contact@metaspacecy.com.">contact@metaspacecy.com.</a>
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>1. Information We Collect and How We Use It.</strong> In order to provide
				and improve our Services, we may collect PII, including the following types of
				information:
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 5 }} gutterBottom>
				<strong>1.1 Information You Provide.</strong> For some features of the Services, we
				ask you for personal information, including name, photo, email address, your social
				network or third-party service provider user ID through which you accessed or
				registered to the App (e. g. Twitter ID, hereinafter, "App Platforms").
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 5 }} gutterBottom>
				<strong>1.2 Third Parties.</strong> We sometimes supplement the information that you
				provide with information that is received from third parties. If you access the
				Services through any App Platforms or interact with any App Platforms or other
				social media plug-in in the Services (such as a Twitter "Like" TECHNOLOGIES) we may
				receive information from your respective social media or App Platforms account,
				including your account information, photo and any information defined as public
				pursuant to the policies of such App Platforms and/your settings in the respective
				App Platform.
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 5 }} gutterBottom>
				<strong>1.3 User Communications.</strong> When you send emails or other
				communication to the Company, we may retain those communications in order to process
				your inquiries, respond to your requests and improve our Services. We may send you
				to push notifications to send you news and updates in respect of the Services.
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 5 }} gutterBottom>
				<strong>1.4 Aggregated Personal Data.</strong> In an ongoing effort to better
				understand and serve the users of the Services, Company often conducts research on
				its customer demographics, interests, and behaviour based on the PII and other
				information provided to us. This research may be compiled and analysed on an
				aggregate basis, and the Company may share this aggregate data with its affiliates,
				agents, and business partners. This aggregate information does not identify you
				personally. The company may also disclose aggregated user statistics in order to
				describe our services to current and prospective business partners, and to other
				third parties for other lawful purposes.
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 5 }} gutterBottom>
				<strong>1.5 User Information.</strong> When you use our Services, we may
				automatically receive and record information from your device and browser, including
				your IP address, IDFA identifiers (for iOS devices), and Identifier. Advertising
				(for iOS devices) and Google Advertiser IDs (for Android devices) (such identifiers
				are collected herein for the following purposes, among other things: frequency
				capping, attribution, conversion events, estimating the number of unique users,
				advertising fraud detection, and debugging) cookie information, search history,
				device ID, Android ID, your regional and language settings, the physical location of
				your device (if you have permitted your mobile or another location-aware device to
				transmit location data), network status (WiFi/3G), and software and hardware
				attributes. We may use your location (city) (if you have permitted your mobile or
				another location-aware device to transmit location data) to learn how to adjust and
				personalise your use of the Services. Our systems may automatically record and store
				technical information regarding the method and nature of your use of the Services,
				including without limitation which pages of the Services our visitors view, what
				games they played, their score, game advancement, any actions in-game, virtual
				content gained, and impressions. An IP address is a numeric code that identifies
				your device on a network, or in this case, the Internet. Your IP address is also
				used to gather broad demographic information. The Company uses all of the PII that
				we collect to understand the usage trends and preferences of our users. We also use
				aggregate data for monetization.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>2. Cookies; Web Beacons and Third-party Processors.</strong> In order to
				collect the data described herein we may use temporary cookies that remain on your
				device for a limited period of time. We may also use persistent cookies that remain
				on your device until the Company’s application is removed, in order to manage and
				maintain the services and record your use and advancement in the Services, digital
				currency, and content you may have gained access to. Cookies by themselves cannot be
				used to discover the identity of the user. A cookie is a small piece of information
				that is sent to and stored on your device. Cookies do not damage your device. Most
				browsers or devices may allow you to block cookies but you may not be able to use
				some features on the App if you block them. You may set most browsers to notify you
				if you receive a cookie (this enables you to decide if you want to accept it or
				not). We may also use web beacons via the Services to collect information. Web
				beacons or "gifs", are electronic images that may be used in our Services or in our
				emails. We use Web beacons to deliver cookies, count visits, and tell if and when an
				email has been opened and acted upon. We also use third-party (including Twitter,
				see their Data Policy) technologies, such as cookies and web beacons, and various
				third-party providers to process and analyse your PII and provide targeted ads,
				including without limitation tracking your use of the Services and elsewhere on the
				internet.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You may opt-out of ad-targeting as follows: for websites go to
				http://www.aboutads.info/choices and http://www.youronlinechoices.eu, and for Apps
				change your settings in your device’s limit ad tracking settings.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				One of our third-party processors is Mixpanel. You can opt-out of Mixpanel’s
				automatic retention of data collected through your browsers and devices while on our
				Services by visiting https://mixpanel.com/optout. To track opt-outs, Mixpanel uses a
				persistent opt-out cookie placed on your device. If you get a new device, install a
				new browser, erase or otherwise alter your browser’s cookie file (including
				upgrading certain browsers) you may also clear the Mixpanel opt-out cookie.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				We are also using Unity Ads as a processor, whose privacy policy is available at:
				https://unity3d.com/legal/privacy-policy
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>
					3. Links. Links to other services, sites, and applications may be provided by
					the Company as a convenience to our users.
				</strong>{' '}
				The Company is not responsible for the privacy practices or the content of other
				sites and applications and you visit them at your own risk. This privacy statement
				applies solely to PII collected by us.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>4. Children.</strong> If you are a child under the age of 13, you must
				obtain parental consent prior to using our Services. The Company will not knowingly
				contact or engage with children under the age of 13 without said parental consent.
				If you have reason to believe that a child has provided us with their PII, please
				contact us at the address given above and we will endeavour to delete that PII from
				our databases.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>5. Information Sharing.</strong> As part of providing the Services and/or
				generating and processing analytics, our affiliates, agents representatives and
				third-party providers may have access to your PII. The Company may also share PII in
				the following circumstances: (a) as required for the provision, maintenance, and
				improvement of the Services; (b) if we become involved in a reorganisation, merger,
				consolidation, acquisition, or any form of sale of some or all of our assets; and/or
				(c) to satisfy applicable law or prevention of fraud or harm or to enforce
				applicable agreements and/or their terms, including investigation of potential
				violations thereof.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>6. Information Security. </strong> We follow generally accepted industry
				standards to protect against unauthorised access to or unauthorised alteration,
				disclosure, or destruction of PII. However, no method of transmission over the
				Internet, or method of electronic storage, is 100% secure. Therefore, while we
				strive to use commercially acceptable means to protect your PII, we cannot guarantee
				its absolute security. We keep your PII only for as long as reasonably necessary for
				the purposes for which it was collected or to comply with any applicable legal or
				ethical reporting or document retention requirements.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>7. Data Integrity, Accessing and Updating Personal Information.</strong> The
				Company processes PII only for the purposes for which it was collected and in
				accordance with this policy or any applicable service agreements. We review our data
				collection, storage, and processing practices to ensure that we only collect, store
				and process the PII needed to provide or improve our Services. We take reasonable
				steps to ensure that the PII we process is accurate, complete, and current, but we
				depend on our users to update or correct their PII whenever necessary. Nothing in
				this policy is interpreted as an obligation to store information, and we may, at our
				own discretion, delete or avoid recording and storing any and all information.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Upon receipt of your written request and enough information to permit us to identify
				your PII, we will disclose to you the PII we hold about you. Upon your request, we
				will also correct, amend or delete any PII that is inaccurate. We do not charge for
				complying with a correction request, however, for all other requests, we may charge
				a small fee to cover its costs. Requests to delete PII are subject to any applicable
				legal and ethical reporting or document retention obligations imposed on the
				Company. We may decline to process requests that are unreasonably repetitive or
				systematic, require disproportionate technical effort, jeopardise the privacy of
				others, or would be extremely impractical, or for which access is not otherwise
				required.{' '}
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>8. Enforcement.</strong> The Company regularly reviews its compliance with
				this policy. Please feel free to direct any questions or concerns regarding this
				policy or our treatment of PII by contacting us as provided above. When we receive
				formal written complaints it is the Company’s policy to contact the complaining user
				regarding his or her concerns. We will cooperate with the appropriate regulatory
				authorities, including local data protection authorities, to resolve any complaints
				regarding the transfer of PII that cannot be resolved between the Company and an
				individual.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>9. Changes to This Privacy Policy.</strong> The Company may update this
				policy. We will notify you about significant changes in the way we treat PII by
				sending a notice to the primary email address specified in your account or by
				placing a prominent notice on the App. We encourage you to periodically review this
				policy for the latest information about our privacy practices.{' '}
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>10. Consent To Processing.</strong> By providing any PII to us pursuant to
				this policy, all users, including, without limitation, users in Singapore, the
				United States, VietNam, and member states of the European Union, fully understand
				and unambiguously consent to this policy and to the collection and processing of
				such PII abroad. The server on which the Services are hosted and/or through which
				the Services are processed may be outside the country from which you access the
				Services and may be outside your country of residence. Some of the uses and
				disclosures mentioned in this policy may involve the transfer of your PII to various
				countries around the world that may have different levels of privacy protection than
				your country. By submitting your PII through the Services, you consent, acknowledge,
				and agree that we may collect, use, transfer, and disclose your PII as described in
				this policy. If you do not consent to the terms of this policy, please do not use
				the Services.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				<strong>11. Questions.</strong> If you have any questions about this policy or
				concerns about the way we process your PII, please contact us at{' '}
				<a href="mailto: contact@metaspacecy.com.">contact@metaspacecy.com.</a>. If you wish
				to delete all information regarding your use of the Services, please contact us at{' '}
				<a href="mailto: contact@metaspacecy.com.">contact@metaspacecy.com.</a>
			</Typography>
		</Box>
	);
}
