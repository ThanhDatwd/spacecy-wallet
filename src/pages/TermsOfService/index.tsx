import React, { useContext, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { SizeContext } from 'contexts/SizeObserver';

export default function TermsOfService() {
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
				Terms of Service
			</Typography>
			<Typography align="center" gutterBottom>
				Updated on October 10, 2022.
			</Typography>
			<Divider variant="middle" sx={{ m: 4 }} />
			<Typography variant="body1" align="inherit" gutterBottom>
				These following Terms of Use constitute a legally binding agreement made between
				you, whether personally or on behalf of an entity ("you") and{' '}
				<strong>Metaspacecy</strong> ("we" or "us") regarding your access to and use of the
				https://metaspacecy.com website and the apps (mobile app, PC app, Website) as well
				as any other asset from social media channels, social networks, communities or
				mobile applications related, linked, or otherwise connected thereto (collectively,
				the "Site" and the "DApp"). <strong>Metaspacecy</strong> is a decentralised
				ecosystem that supports multi-chain, using a specially-developed system called Smart
				Contract (the "Smart Contract") to enable users to collect, manage, and trade
				non-fungible tokens (NFTs) and other digital assets. The ecosystem also provides
				virtual environments in which all types of NFTs can be embedded to create the
				diversity in the metaverse. These assets can then be visualised in every corner of
				the system so that the user can interact with the Site whenever a demand comes. The
				Smart Contract and the Site are collectively referred to in these Terms as the
				"DApp". By using the DApp, users can manage their assets and use the Smart Contract
				to battle and trade with other DApp users.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				WE ARE ONLY WILLING TO DISTRIBUTE THE DAPP, THE SMART CONTRACT, AND THE SITE
				AVAILABLE TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING THE DAPP, THE SMART
				CONTRACT, THE SITE, OR ANY ASSET-RELATED, OR BY CLICKING “I ACCEPT” BELOW AND
				IMPLYING YOUR ACCEPTANCE BY CHECKING IN THE TICK BOX, YOU ARE CONFIRMING THAT YOU
				HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY ALL OF THESE TERMS OF USE. IF YOU DO
				NOT AGREE AND/OR ACCEPT ALL OF THESE TERMS OF USE, THEN YOU ARE NOT ELIGIBLE FOR
				USING THE DAPP, THE SITE, AND THE SMART CONTRACT AND YOU MUST STOP ANY FORM OF USING
				OUR ASSETS IMMEDIATELY.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Supplemental terms and conditions or any type of additional documents that may be
				published on the Site, the DApp, and the Smart Contract at some point in the future
				will be eventually integrated with existing terms of use. We reserve our rights in
				our sole discretion to make any type of changes or modifications to these Terms of
				Use at any time and for any reason. You will be notified of any changes and are able
				to access them by updating the most up-to-date of these Terms of Use. However, it is
				not legally compulsory for us to notify and release changelogs pointing out such
				changes specifically. It is your responsibility to periodically review these Terms
				of Use to stay fully informed of updates. You will be subjected to and deemed as
				having awareness and acceptance of the changes in any revised Terms of Use by
				proceeding to use the Site, the DApp, and the Smart Contract after such revised
				terms come into effect on a published date.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Information on the Site, the DApp, and the Smart Contract are not intended for
				distributing to or being used by any single person or entity in any jurisdiction or
				country where such distribution or use would be against its existing laws or
				regulations as well as any circumstance would subject us to any registration
				requirements within the territories of said jurisdiction or country. As a matter of
				fact, people who make their decisions to access the Site and/or the DApp from
				outside of our base country are deemed to have the understanding of doing so on
				their own choices and therefore are legally eligible for compliance with local laws,
				assuming they are applicable to them to some extent.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Our product is intended for users who are at least 18 years old. People under the
				age of 18 are not permitted to use any form of our assets including the Site, the
				DApp, and the Smart Contract. Such approaching people are asked to return
				immediately upon trying to access our product.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				INTELLECTUAL PROPERTY COPYRIGHT
			</Typography>
			<Typography variant="body1" align="inherit">
				Apart from other noted indications, the Site, the DApp, and Smart Contract are our
				proprietary properties as well as all source codes, databases, functionalities,
				software, website designs, audio, videos, texts, photographs, and graphics on the
				Site and the DApp (collectively, the "Content"). Trademarks, service marks, and
				logos (the "Marks") are owned and legally licensed to us, controlled by us, and are
				protected regarding registration of intellectual property copyright. Apart from uses
				stated and provided in these Terms of Use, no part of the Site, the DApp as well as
				the Smart Contract and no Content or Marks may be copied, reproduced, aggregated,
				republished, uploaded, posted, publicly displayed, encoded, translated, transmitted,
				distributed, sold, licensed, or otherwise exploited for any commercial purposes
				whatsoever, without asking for our legal approval.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Provided that you are eligible to use the Site, the DApp, and the Smart Contract,
				you are granted limited access to and use of the Site to download or print a copy of
				any portion of the Content regarding personal, non-commercial uses.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				USER REPRESENTATIONS
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				By using the Site, the DApp, and the Smart Contract, you represent yourself and
				agree that:
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(1) All registration information you submit is fully stated, true, accurate, and
				up-to-date.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(2) You will maintain the accuracy of such given information and will be asked
				promptly to make updates whenever necessary.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(3) You have the legal capacity and the thorough understanding of complying with
				these Terms of Use.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(4) You are not a part of a minority community that practises laws and regulations
				which have nothing in common with ours.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(5) You will not access the Site, the DApp, and the Smart Contract using automated
				and non-human means, whether it is a bot, script, or anything alike;
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(6) You will not use the Site, the DApp, and the Smart Contract for committing any
				illegal and unauthorised purpose.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(7) Your use of the Site, the DApp, and the Smart Contract will not violate any
				existing law or regulation. If you provide any information that is untruthful,
				inaccurate, or not up-to-date, we have the right to suspend or terminate your
				accounts and refuse to approve any action regarding any current or future activities
				of the Site, the DApp, and the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(8) You can only own one account attached to one device at a time.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(9) You are not on any blacklist of any organisation for any reason including
				committing scams, fraud; illegal data exploiting, using third-party software for
				personal benefits; trying to gain access and damage our assets without our approval,
				and everything alike. If we find out any illegal activities, we will make a prompt
				intervention and resolve legal means if necessary.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				USER REGISTRATION
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You are required to connect Wallet upon accessing the Site, the DApp, and the Smart
				Contract. You should have control over your password confidentiality and will be
				responsible for the use of your account and password. We reserve the right to
				remove, reclaim or change a username you select if we determine in case such
				username is inappropriate or appears as an irritation to other users.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				PROHIBITED ACTIVITIES
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You may not access or use the Site, the DApp, and the Smart Contract for any purpose
				other than those for which we make the Site, the DApp, and the Smart Contract
				available. The Site, the DApp, and the Smart Contract may not be used in connection
				with any commercial activities if not approved by our legal teams in{' '}
				<strong>Metaspacecy</strong>.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Systematically retrieve data or other content from the Site, the DApp, and the Smart
				Contract to create or compile, directly or indirectly, a collection, compilation,
				database, or directory without our approval.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Make any unauthorised use of the Site, the DApp, and the Smart Contract, including
				collecting usernames and/or email addresses of registered users by using third-party
				software; creating user accounts by automated means including using bots or hiding
				presences by faking IP addresses.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Use a buying agent or purchasing agent to make purchases on the Site, the DApp, and
				the Smart Contracts.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Use the Site, the DApp, and the Smart Contract as assets to advertise and offer to
				sell personal goods and services not relating to <strong>Metaspacecy</strong>.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Circumvent, disable, or otherwise interfere with security-related features of the
				Site, the DApp, and the Smart Contract, including those that prevent or restrict the
				act of copying Content or enforcing limitations on the use of the Site, the DApp,
				and the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Any trick, defraud, or mislead us and other users with any attempt to get sensitive
				account information such as user passwords.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Making improper use of our support services or submitting false reports.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Committing acts of using automated means or AI to interfere with our assets, such as
				using scripts to send comments or messages, or using any data mining tools, robots,
				data extraction tools, and alike.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Interfering with or creating interruption on the Site, the DApp, the Smart Contract,
				the networks, or services related to the product.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Attempting to impersonate another user or person; using the username of another
				user.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Selling or transferring your account.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Using any information obtained from the Site, the DApp, and the Smart Contract in
				order to harass, abuse, or harm another person.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Using the Site, the DApp, and the Smart Contract as a part of an effort to compete
				with us.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Using the Site, the DApp, and the Smart Contract or every product-related thing for
				commercial purposes.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Deciphering, decompiling, disassembling, or interfering mechanically with any of the
				software parts or assets of the Site, the DApp, and the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Attempting to bypass any measures designed to prevent or restrict access to the
				Site, the DApp, and the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Harassing, intimidating, or threatening our employees or agents whose jobs are to
				provide any portion of the Site, the DApp, and the Smart Contract to you directly.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Deleting logos or marks representing the copyright or other proprietary rights of
				our product.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Copying and making use of the Site’s frontend codes, including but not limited to
				Flash, PHP, HTML, JavaScript, and others.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Uploading or transmitting viruses, Trojan horses, or anything alike, including
				excessive use of capital letters and spamming (continuous posting of repetitive
				text), that interfere with our product’s intentional original works. Modifying,
				impairing, disrupting, altering, or interfering with the intentional original uses,
				features, functions, operations, or acts of maintenance of the Site, the DApp, and
				the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				All types of activities and all forms of action pose a law and regulation violation.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				FEE AND PAYMENT
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You can purchase, and trade NFT Collections (collectively, "Collections"). When the
				marketplace is launched and players are allowed to make transactions with others,
				please note that such transactions are conducted solely through the Blockchain via a
				connected wallet. We will keep no information and provide no control, support, or
				the ability to reverse reported transactions. In general, we have no liability to
				you or to any third party for any alleged problems that arise during the alleged
				trades and transactions conducted via the Smart Contract, the Blockchain.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				The Blockchain requires the payment of a transaction fee for every transaction that
				occurs in the network. The fee funds the network of computers that run the
				decentralised network rather than as profits.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				In addition to the fee, each time you use the Smart Contract to conduct a
				transaction via the DApp, you are agreed to allow us to collect a service fee based
				on the total value of that transaction. You should have a clear understanding that
				the commission will be transferred directly to us through the Blockchain as a part
				of the transaction.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				As a matter of fact, we (we and you users) will be legally responsible for paying
				any type of cost, duty, and tax as your government requests. Such numbers will vary
				according to your jurisdictions and countries as well as the national laws and
				regulations.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				We have no liability and will provide no data, and no support to you in such
				processes.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				SUBMISSION
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You should have a full understanding and an agreement that any question, comment,
				suggestion, idea, feedback or other forms of information regarding using the Site,
				the DApp and the Smart Contract ("Submissions") provided by you to us are
				non-confidential and should eventually become our properties. We are eligible for
				the unrestricted use of these Submissions for any lawful purposes, or commercial
				activities without notifying you of our acknowledgment or compensation. You also
				should be aware of the discretion of any content-related you submit to the Site, the
				DApp, and the Smart Contract. Everything that poses a violation of the laws and
				regulations will be completely removed without notification.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				THIRD-PARTY WEBSITE AND CONTENT
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Third-party websites are the Site and/or DApp that links you to other websites,
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Third-party contents are articles, photographs, text, graphics, pictures, designs,
				music, sound, video, information, applications, software, and other content or items
				belonging to or originating from third parties.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				We are not responsible for any Terms of Use of any Third-Party Websites you accessed
				through the Site and/or the DApp, or any Third-Party Content posted on, available
				through, or installed from the Site and/or the DApp. We do not hold responsible for
				any of the following: content, accuracy, offensiveness, opinions, reliability,
				privacy practices, or other policies of or contained in the Third-Party Websites or
				the Third-Party Contents.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				If you decide to leave the Site and/or the DApp and access the Third-Party Websites
				or to use or install any Third-Party Content, you do so at your own risk and you
				should be aware that these Terms of Use you are reading are no longer effective. At
				this point, the Terms of Use of the Third-Party Websites you are using are
				effective. You should review the applicable terms and policies, including privacy
				and data gathering practices, of any website to which you navigate from the Site
				and/or the DApp or relating to any applications you use or install from the Site
				and/or the DApp.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Any purchase you make through Third-Party Websites is no longer within our Terms of
				Use, so we are not responsible for any problem that arises from the purchase. You
				agree and acknowledge that we do not endorse the products and services offered on
				Third-Party Websites and you should hold us harmless from any harm caused by your
				purchase of such products and services.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Additionally, any losses sustained by you or harm caused to you relating to
				resulting in any way from any Third-Party Content or any contact with Third-Party
				Websites are not our responsibilities.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				ADVERTISEMENT
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				We provide areas within the Site and the DApp for advertisements and other
				information. Advertisers are fully responsible for the reliability of the
				advertisements, including the services and products. These advertisements should not
				violate any rules, and advertisers must prove that they have the following rights,
				but are not limited, to intellectual property rights, publicity rights, and
				contractual rights. We hold no responsibility if there are any violations regarding
				these rights.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				TERMINATION
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				These Terms of Use remain in full force and effect while you use the Site, the DApp,
				and the Smart Contracts. We reserve the right and are able to conduct the following
				actions as of our own sole discretion and without informing you of any notice or
				liability: deny access to and use of the Site, the DApp, and the Smart Contracts
				(including blocking IP Addresses) to any person for breach of any presentation,
				warranty, or covenant contained in these Terms of Use. We may terminate your use or
				participation in the Site, the DApp, and the Smart Contracts or delete your account
				without warning, at our sole discretion.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				If we terminate or suspend your account for any reason, you are prohibited from
				registering and creating a new account under your name, a fake or borrowed name, or
				the name of any third party, even if you may be acting on behalf of the third party.
				In addition to terminating and suspending your account, we reserve the right to take
				appropriate legal action, including without limitation pursuing civil, criminal, and
				injunctive redress.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				DISCLAIMERS
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You expressly understand and agree that your access to and use of the Site, the
				DApp, and the Smart Contracts are at your sole risk and that the Site, the DApp, and
				the Smart Contracts are provided "as is" and "as available" without warranties of
				any kind, whether express or implied. To the fullest extent permissible pursuant to
				applicable law, we, our subsidiaries, affiliates, and licensors make no express
				warranties and hereby disclaim all implied warranties regarding the Site, the DApp,
				and the Smart Contracts and any part of it (including, but not limited to, the site,
				any smart contract, or any external websites), including the implied warranties of
				merchantability, fitness for a particular purpose, non-infringement, correctness,
				accuracy, or reliability. Without limiting the generality of the foregoing, we, our
				subsidiaries, affiliates, and licensors do not represent or warrant to you that:
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(i) your access to or use of the Site, the DApp, and the Smart Contracts will meet
				your requirements,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(ii) your access to or use of the Site, the DApp, and the Smart Contracts will be
				uninterrupted, timely, secure, or free from error,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(iii) usage data provided through the Site, the DApp, and the Smart Contracts will
				be accurate,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(iv) the Site, the DApp, and the Smart Contracts or any content, services, or
				features made available on or through the Site, the DApp, and the Smart Contracts
				are free of viruses or other harmful components, or
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(v) that any data that you disclose when you use the Site, the DApp, and the Smart
				Contracts will be secured. Some jurisdictions do not allow the exclusion of implied
				warranties in contracts with consumers, so some or all of the above exclusions may
				not apply to you.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You accept the inherent security risks of providing information and dealing online
				over the Internet and agree that we have no liability or responsibility for any
				breach of security unless it is due to our gross negligence.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				We will not be responsible or liable to you for any losses you incur as the result
				of your use of the Blockchain, including but not limited to any losses, damages, or
				claims arising from
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(a) user error, such as forgotten passwords or incorrectly construed smart contracts
				or other transactions;
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(b) server failure or data loss;
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(c) corrupted wallet files;
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(d) unauthorised access or activities by third parties, including but not limited to
				the use of viruses, phishing, brute-forcing, or other means of attack against the
				app, Blockchain network, or the wallet.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				NFT Collections are intangible digital assets that exist only by virtue of the
				ownership record maintained on the Blockchain. All smart contracts are conducted and
				occur on the decentralised ledger within the ronin network.{' '}
				<strong>Metaspacecy</strong> has no control over and makes no guarantees or promises
				with respect to the smart contract.
				<strong>Metaspacecy</strong> is not responsible for losses due to blockchains or any
				other features of the Blockchain. Including but not limited to late reports by
				developers or representatives (or no report at all) of any issues with the
				blockchain including forks, technical node issues, or any other issues having fund
				losses as a result.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				LIMITATION OF LIABILITY
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You understand and agree that we, our subsidiaries, affiliates, and licensors will
				not be liable to you or to any third party for any indirect, incidental, special,
				consequential, or exemplary damages which you may have, including, but not limited
				to, any loss of profits (both directly and indirectly), loss of goodwill or business
				reputation, loss of data, cost of procurement of substitute goods or services, or
				any other intangible loss, even if we have been advised of the possibility of such
				damages.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You agree and acknowledge that our total, aggregate liability to you for any and all
				claims arising out of or relating to these terms or your access to or use of (or
				your inability to access or use) any portion of the Site, the DApp, and the Smart
				Contracts, whether in contract, tort, strict liability, or any other legal theory,
				is limited to the greater of
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(a) the amounts you actually paid us under these terms in the twelve (12) month
				period preceding the date the claim arose, or
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(b) one hundred (100) US dollars.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You agree and acknowledge that we have made the Site, the DApp, and the Smart
				Contracts available to you and entered into these terms in reliance upon the
				warranty disclaimers and limitations of liability set forth herein, which reflect a
				reasonable and fair allocation of risk between the parties and form an essential
				basis of the bargain between us. We would not be able to provide the Site, the DApp,
				and the Smart Contracts to you without these limitations.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Some jurisdictions do not allow the exclusion or limitation of incidental or
				consequential damages, and some jurisdictions also limit disclaimers or limitations
				of liability for personal injury from consumer products, so the above limitations
				may not apply to personal injury claims.
			</Typography>

			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				ASSUMPTION OF RISK
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You accept and acknowledge each of the following:
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(1). The prices of blockchain assets are easy to change because the fluctuations in
				the price of other digital assets could materially and adversely affect the value of
				your NFT, which may also be subject to significant price volatility. We cannot
				guarantee that any purchasers of NFT will not lose money.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(2). You are solely responsible for any taxes applied to your NFT-related
				transactions, according to your own country’s or region’s tax rules.{' '}
				<strong>Metaspacecy</strong> is not responsible for determining the taxes that apply
				to your transactions on the DApp, the Site, or the Smart Contract.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(3). The DApp does not store, send, and receive NFT. This is because NFT Collections
				exist only by virtue of the ownership record maintained on the App’s supporting
				blockchain. Any transfer of NFT Collections occurs only on the Blockchain.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(4). There are risks and limitations associated with using an Internet-based
				currency, including, but not limited to, the risk of hardware, software, and
				Internet connections, the risk of malicious software introduction, and the risk that
				third parties may obtain unauthorised access to information stored within your
				wallet. You accept and acknowledge that <strong>Metaspacecy</strong> will not be
				responsible for any communication failures, disruptions, errors, distortions, or
				delays you may experience when using the Blockchain.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(5). A lack of use or public interest in the creation and development of distributed
				ecosystems could negatively impact the development of the{' '}
				<strong>Metaspacecy</strong> ecosystem, and therefore the potential utility or value
				of NFT Collections.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(6). The current state of regulations regarding blockchain technologies,
				cryptocurrencies, and tokens is uncertain. When new regulations or policies are
				introduced, they may materially adversely affect the development of the{' '}
				<strong>Metaspacecy</strong>
				ecosystem, and therefore the potential utility or value of NFT Collections.
			</Typography>

			<Typography variant="body1" align="inherit" gutterBottom>
				(5). A lack of use or public interest in the creation and development of distributed
				ecosystems could negatively impact the development of the{' '}
				<strong>Metaspacecy</strong> ecosystem, and therefore the potential utility or value
				of NFT Collections.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				(5). A lack of use or public interest in the creation and development of distributed
				ecosystems could negatively impact the development of the{' '}
				<strong>Metaspacecy</strong> ecosystem, and therefore the potential utility or value
				of NFT Collections.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				INDEMNIFICATION
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				You agree to indemnify and defend us, including our affiliates and respective
				directors, officers, and personnel from and against all losses, costs, damages,
				expenses, and liabilities (including reasonable legal fees and disbursements) that
				may be suffered or incurred by Third-Party arising out of or as a result of or
				relating in any manner to a claim relating to
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(1) use of the Site,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(2) breach of these Terms of Use,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(3) any breach of your representations and warranties set forth in these Terms of
				Use,
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(4) your violation of the rights of a third party, including but not limited to
				intellectual property rights, or
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				(5) any overt harmful act toward any other use of the Site, the DApp, and the Smart
				Contracts with whom you connected via the Site, the DApp, and the Smart Contracts.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Notwithstanding the foregoing, we reserve the right, at your expense, to assume the
				exclusive defence and control of any matter for which you are required to indemnify
				us, and you agree to cooperate, at your expense, with our defence of such claims. We
				will use reasonable efforts to notify you of any such claim, action, or proceeding
				which is subject to this indemnification upon becoming aware of it.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				USER DATA
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Certain data, including your data use of the Site, the DApp, and the Smart
				Contracts, will be kept for us to manage the performance of the Site, the DApp, and
				the Smart Contracts. Although we perform regular routine backups of data, you are
				solely responsible for all data that you transmit or that release to any activity
				you have performed using the Site, the DApp, and the Smart Contracts. You agree that
				we shall have no liability to you for any loss or corruption of any such data, and
				you hereby waive any right of action against us arising from any such loss or
				corruption of such data.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				MISCELLANEOUS
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				These Terms of Use and any policies or operating rules posted by us on the Site, the
				DApp, and the Smart Contracts, or in respect to the Site, the DApp, and the Smart
				Contracts constitute the entire agreement and understanding between you and us.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Our failure to exercise or enforce any right or provision of these Terms of Use
				shall not operate as a waiver of such right or provision.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				These Terms of Use operate to the fullest extent permissible by law. We may assign
				any or all of our rights and obligations to others at any time. We shall not be
				responsible or liable for any loss, damage, delay, or failure to act caused by any
				cause beyond our reasonable control.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				If any provision or part of a provision of these Terms of Use is determined to be
				unlawful, void, and unenforceable, that particular provision is deemed separable
				from the whole Terms of Use and does not affect the validity and enforceability of
				any remaining provisions.
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				There is no joint venture, partnership, employment, or agency relationship created
				between you and us as a result of these Terms of Use or use of the Site. You agree
				that these Terms of Use will not be construed against us by virtue of having drafted
				them.
			</Typography>
			<Typography variant="h4" align="left" fontWeight="600" gutterBottom sx={{ mt: 2 }}>
				Contact Us
			</Typography>
			<Typography variant="body1" align="inherit" gutterBottom>
				Don't hesitate to contact us if you have any questions.
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				● Via Email: <a href="mailto: contact@metaspacecy.com.">contact@metaspacecy.com</a>
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				● Via this Link: <a href="https://metaspacecy.com">https://metaspacecy.com</a>
			</Typography>
			<Typography variant="body1" align="inherit" sx={{ ml: 2 }} gutterBottom>
				● Via this Address: 10 Anson Road, #13-09 International Plaza, Singapore 079903
			</Typography>
		</Box>
	);
}
