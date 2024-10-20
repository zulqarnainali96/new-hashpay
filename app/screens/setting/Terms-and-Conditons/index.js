import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "..";
import { ScrollView } from "react-native";
import colors from "../../../utils/colors";

export const TermsStyles = StyleSheet.create({
  Container: {
    backgroundColor: colors.profileBgColor,
    width: "100%",
    paddingHorizontal: 14,
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Roboto",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingLeft: 10,
    color: "#444",
  },
  paragraphStyle: {
    fontSize: 13,
    paddingHorizontal: 5,
    textAlign: "left",
    lineHeight: 15,
  },
  margin9: {
    marginVertical: 8,
  },
  margin6: {
    marginVertical: 4,
  },
  margin10: {
    marginVertical: 9,
  },
});
const TermsConditions = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[TermsStyles.Container, { paddingTop: 12 }]}
    >
      <Text style={TermsStyles.titleStyle}>
        TERMS OF USE
      </Text>
       <View style={TermsStyles.margin10} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Vinekross Technologies Limited, Its Parent, Subsidiaries, Successors,
        Assignees And Affiliates ("HashPay", "We", "Our", Or "Us") Provide
        Access To And Use Of Hashgreed.com, A Website Owned And Operated By
        HashPay, As Well As Any And All Other Websites, Mobile Optimised Sites,
        Mobile Applications, Subdomains Owned, Operated Or Controlled By HashPay
        (The "Website", "HashPay App"), Together With The Content, Software,
        Mobile Services, Financial Products And Functionality Offered On Or
        Through The Website And The HashPay App (Collectively, The "Services").
      </Text>
      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>Consent</Text>

      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        When you sign up and use HashPay (via our website or Google Play Store),
        you accept the terms described within this Privacy Policy. We will not
        share your personal information with anyone except as described in this
        Privacy policy. In this policy "information" refers to any confidential
        and/or personal data or other information related to users of HashPay
        services
      </Text>
      <View style={{ marginVertical: 7 }} />
      <Text style={TermsStyles.titleStyle}>
        This Privacy Policy Is Designed To Describe
      </Text>
      <View style={TermsStyles.margin10} />

      <Text style={TermsStyles.titleStyle}>
        Who we are and how to contact us
      </Text>
      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>Who we are</Text>
      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay is a modern blockchain enabled financial platform meeting
        customers where they are: on their smartphones. We offer our customers
        the broadest level of choice and financial access.
      </Text>
      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>How to Contact Us</Text>
      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you have any questions about our practices or this Privacy Policy,
        please contact us at: support@Hashgreed.com and 08128447600
      </Text>

      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>
        Your Rights Relating to Your personal data
      </Text>
      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>
        Request access to your personal data
      </Text>
      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This enables you to receive a copy of the personal data we hold about
        you and to check that we are lawfully processing it.
      </Text>

      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>
        Request correction of the personal data that we hold about you
      </Text>
      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This enables you to have any incorrect or incomplete information about
        you corrected.
      </Text>

      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>
        Request erasure of your personal data
      </Text>
      <View style={TermsStyles.margin10} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This enables you to ask us to delete or remove Personal Data where there
        is no legal reason for us continuing to process it or you object to us
        processing it (see below).{" "}
      </Text>
      <View style={TermsStyles.margin10} />
      <Text style={TermsStyles.titleStyle}>
        Object to processing of your Personal Data
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This right exists where we are relying on a legitimate interest as the
        legal basis for our processing and there is something about your
        situation, which makes you want to object to processing of your Personal
        Data on this ground. You also have the right to object where we are
        processing your Personal Data for direct marketing purposes.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Request the restriction of processing of your Personal Data
      </Text>

      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This enables you to ask us to suspend the processing of Personal Data
        about you, for example if you want us to establish its accuracy or the
        reason for processing it.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Request the transfer of your Personal Data
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will provide to you, or a third party you have chosen, your Personal
        Data in a structured, commonly used, machine-readable format. Note that
        this right only applies to automated information which you initially
        provided consent for us to use or where we used the information to
        perform a contract with you.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Withdraw consent</Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This right only exists where we are relying on consent to process your
        Personal Data ("Consent Withdrawal").
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you withdraw your consent, we may not be able to provide you with
        access to the certain specific functionalities of our Site
      </Text>
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will advise you if this is the case at the time you withdraw your
        consent.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        How to exercise your personal rights
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you wish to exercise any of the rights above, please contact us using
        the details in Who we are and How to contact us.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        You will not have to pay a fee to access your personal data (or to
        exercise any right), however, we may charge a reasonable fee for consent
        withdrawal if your request is clearly unfounded, repetitive or
        excessive. In the event of these circumstances we may refuse to comply
        with your request.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may need to request specific information from you to help us confirm
        your identity and ensure your right to access your Personal Data (or to
        exercise any of your other rights).
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This is a security measure to ensure that Personal
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Data is not disclosed to any person who has no right to receive it. We
        may also contact you to ask you for further information in relation to
        your request to speed up our response.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We try to respond to all legitimate requests within one month.
        Occasionally it may take us longer than a month if your
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        request is particularly complex or you have made a number of requests.
        In this case, we will notify you and keep you updated.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Complaints</Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you would like to submit a complaint regarding this Privacy Policy or
        our practices in relation to your Personal Data, please contact us at:
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        support@Hashgreed.com and 08128447600.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We endeavor to reply to your complaint as soon as possible.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you feel that your complaint has not been adequately resolved, the
        NDPR gives you the right to lodge a complaint with the relevant
        supervisory authority
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Marketing Communication Preferences
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you would like us to stop sending marketing messages or modify your
        email preferences at any time, please follow any of these procedures:
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        1: Follow the opt-out messages sent in any of the emails
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        2: Go through the notification switch off process in the settings on
        your application
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        3: Contact us at any time using the contact details in
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Who We Are and How to Contact Us.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Where you opt out of receiving these marketing messages, this will not
        apply to Personal Data provided to us for processing for legitimate
        service-related purposes.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What personal data we collect</Text>
      <View style={TermsStyles.margin6} />
      <Text style={TermsStyles.titleStyle}>Customer information</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        To use the HashPay Services, you must provide customer information via
        our registration, account upgrade or profile forms. This information
        includes, but it is not limited to
      </Text>

      <View style={TermsStyles.margin9} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Full name, e-mail address and phone number, HashPay PIN, address,
        whether you are male or female, date of birth.
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This information includes, but it is not limited to
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        For some services we may also collect Bank Verification Number (BVN),
        ID, documentation information and photograph (where applicable)
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Additional information may be requested to participate in social media
        functions on our site, promotions or surveys and when you contact us to
        report a problem on our site.
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you communicate with our Customer Services team via email, Live Chat
        or telephone your conversations may be recorded and stored for training
        and record keeping purposes
      </Text>

      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We use this information to measure and improve our Service quality
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Device information</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        The following information may be collected from you automatically when
        you use the HashPay mobile app, but it is not limited to:
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Details of your handset/device, unique device identifiers (IMEI or
        serial number), information about the SIM card, mobile network,
        operating system and browser settings
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We use this information to protect our customers from service-related
        crime, enhance the services we offer and to help us understand how
        people use the Service.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>Location information</Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Certain HashPay features may require location information from your
        device’s GPS. With your consent this information will be collected for
        these services. You will be required to grant consent. Turning off
        location services may render some services unavailable.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Analytics</Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may use in-app analytics technologies, like Google Analytics, to help
        improve and simplify the overall app, design and service.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        These tools track aggregated information about in app usage, provide
        performance measurements and allow better reporting on application
        failures
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We record when you install or uninstall HashPay to help us track who is
        using the Servic
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>Tracking and Cookies</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        A cookie is a string of information that a website stores on a visitor's
        computer, and that the visitor's browser provides to the website each
        time the visitor returns.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay uses cookies to help HashPay identify and track visitors, their
        usage of the HashPay website, and their website access preferences.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay visitors who do not wish to have cookies placed on their
        computers should set their browsers to refuse cookies before using the
        websites or decline the option of using cookies when they visit for the
        first time.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Our services may not function property without the aid of cookies.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In respect of Customer information or information that enables us to
        identify you personally (‘Personal Information’). We have provided that
        following table to further outline the data that we collect:
      </Text>
      <View style={TermsStyles.margin9} />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={TermsStyles.titleStyle}>
          1: Category of Personal Data collected
        </Text>
        <Text style={TermsStyles.titleStyle}>2: What this means</Text>
        <Text style={TermsStyles.titleStyle}>3: Identity Data</Text>
      </View>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Identity Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        First name, surname, maiden name, last name, username or similar
        identifier, marital status, title, date of birth and gender, selfie
        picture, identification document number, copies of ID documents or other
        forms of identification.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Contact Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your home address, work address, billing address, email address and
        telephone numbers.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Online Presence Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Links to your public account pages at social media websites, links to
        personal websites, and other online materials related to you.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Financial Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your bank account and payment card details, statements about your wealth
        and financial situation.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Transaction Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Any details about payments to and from you and other details of
        subscriptions and services you have purchased from us.
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Data in respect of your transactions with third parties (including your
        credit history).
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Content Data</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Any content you post to the Services not already included in another
        category, including without limitation, your profiles, questions,
        preference settings, answers, messages, comments, and other
        contributions on the Services, and metadata about them (such as when you
        posted them) (“Content").
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        How we use your personal data and why
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Marketing and Communications Data
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your preferences in receiving marketing from us and our third parties
        and your communication preferences.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you correspond with us by email or messaging through the Services, we
        may retain the content of such messages and our responses.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Behavioral Data</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Inferred or assumed information relating to your behavior and interests,
        based on your online activity. This is most often collated and grouped
        into "segments".
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Technical Data</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Security credentials (username and PIN/password) Internet protocol (IP)
        address, your login data, browser type and version, time zone setting
        and location, browser plug-in types and versions, operating system and
        platform and other technology on the devices you use to access this
        application or website or use our services.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This personal data will be used to assist us in delivering the service
        that you signed up for; allow us to understand how services are being
        used by you; protect you and your account; improve our services and
        communicate new services and offers to you.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Who We Share Your Personal Data With
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Who We Share Your Personal Data With
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may share your personal data with third parties as described in the
        table below. We consider this information to be a vital part of our
        relationship with you.
      </Text>
      <View style={TermsStyles.margin9} />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={TermsStyles.titleStyle}>1: Recipients</Text>
        <Text style={TermsStyles.titleStyle}>2: Why we share it</Text>
        <Text style={TermsStyles.titleStyle}>3: Our Affiliates</Text>
      </View>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Our affiliates</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Our affiliates may access your Personal Data to help us develop,
        maintain and provide our Services and help manage our customer
        relationships (including providing customer support, customer liaison,
        fund advisory services, etc).
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Service Providers</Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Our service providers provide us support for our Services, including,
        for example, website and application development, hosting, maintenance,
        backup, storage, virtual infrastructure, payment processing, auto-deduct
        services, analysis, identity verification, background and compliance
        reviews, fund administration, banking services, and other services for
        us, which may require them to access or use Personal Data about you.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Professional Advisers</Text>
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Our lawyers, accountants, bankers, auditors and insurers may need to
        review your personal data to provide consultancy, compliance, banking,
        legal, insurance, accounting and similar services.Legal and Taxing
        Authorities, Regulators and Participants in Judicial Proceedings.
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay may disclose your Personal Data if we believe it is reasonably
        necessary to comply with a law, regulation, order, subpoena, rule of a
        self-regulatory organization or audit or to protect the safety of any
        person, to address fraud, security or technical issues, or to protect
        our legal rights, interests and the interests of others, such as, for
        example, in connection with the acquisition, merger or sale of
        securities or a business (e.g. due diligence).
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Advertisers</Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Certain users of the Services may have access to your Personal Data for
        the purpose of enabling them to interact with you and more effectively
        offer opportunities through the Site that are targeted towards your
        background and preferences.
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may also allow third-parties, including ad servers or ad networks, to
        serve advertisements on the Site, and such third parties may be provided
        with access to your Personal Data to provide advertising tailored to
        your interests.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Researchers</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        To enhance the public understanding of patterns and trends in the
        markets served by or Services, we may provide Personal Data to third
        parties under confidentiality obligations such as, for example,
        academics or contractors for research purposes.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>API Users</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        A limited number of partners have API access to portions of the Site.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Examples of the most common API uses are OAuth and AML/accreditation
        verification of potential investors.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In addition, Personal Data you choose to add to your profile will be
        available for public viewing on the site.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        You may ask us to show your information to a select set of Users, and we
        will do our best to limit disclosure to those Users but we cannot
        promise that no one else will see that information on the Site, nor do
        we control what users who are allowed to see your information will do
        with it.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you want your information to remain private, don’t make it available
        to other Users on our site. If you are a User, some of your activities
        may not be accessible to other Users, but other
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        users may be able to infer certain facts about your activities and
        identity on HashPay.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In addition, HashPay advisers, Top level employees and lead investors
        may have access to your Personal Data to help them evaluate, invite and
        communicate with you as a User if you are a User, your information will
        generally be publicly available, and they may have access to your
        Personal Data to assist them in discovering, evaluating and tracking
        communications.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        As we develop our business, we may buy or sell businesses or assets. In
        the event of a corporate sale, merger, reorganization, dissolution or
        similar event, we may also transfer your Personal Data as part of the
        transferred assets without your consent or notice to yo
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may also share non personal data (such as anonymous usage data, data
        referring/exit pages and URLs, platform types, number clicks, etc.) with
        interested third parties to help them understand the usage patterns for
        certain Services or conduct independent research based on such anonymous
        usage data.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you request that we remove your Personal Data as described in Your
        Rights Relating to Your Personal Data, we will convey that request to
        any third-party with whom we have shared your data. We are not, however,
        responsible for revising or removing your Personal Data obtained by any
        third party who has previously been provided with your information by us
        in accordance with this policy or any third party to whom you have
        provided such information (whether by sharing your login and password,
        or otherwise).
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will also use this data to process payments and comply with legal and
        regulatory obligations (see below).
      </Text>

      <Text style={TermsStyles.titleStyle}>
        What information is stored and for how long
      </Text>

      <Text style={TermsStyles.titleStyle}>Payment information</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        To process payments on HashPay, we need to share some of your personal
        information with the person or company with whom you are transacting.
        This information may include:
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        1: Contact information (mobile number, e-mail address, personal photo)
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        2: Payment information (card details, banking information, wallet
        balance)
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will not expose your credit/debit card number or bank account number
        to anyone you have paid or who has paid you through HashPay, except with
        your express permission or if we are required to do so to comply with a
        subpoena or other legal action.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Identity information</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We collect and store personal information about you to comply with the
        relevant financial regulations.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Apart from the circumstance of complying with a Court Order, Arbitral
        Panel, Tribunal, Regulatory Directive or Order or any other legal or
        regulatory obligation, we do not disclose information about identifiable
        individuals to other parties, but we may provide them with anonymous
        aggregate information, such as the number of people of a certain age or
        sex who have performed certain transactions of a certain amount within a
        particular time frame, for example.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Where we use a 3rd party service, with your consent, we may share your
        information in order to offer the service or improve the experience of
        that service.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        When you use such a service for the first time, you will need to review
        and agree to their terms and conditions, privacy policy and other
        related agreements where applicable.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>In respect of the NDPR</Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In respect of each of the purposes for which we use your Personal Data,
        the NDPR requires us to ensure that we have a legal basis for that use.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        The legal basis depends on the Services you use and how you use them.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This means we collect and use your Personal Data only where:
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        1: We need it to provide you the Services, including to operate the
        Services, provide customer support and personalized features and to
        protect the safety and security of the Services;
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        2: It satisfies a legitimate interest (which is not overridden by your
        data protection interests), such as for research and development, to
        market and promote the Services and to protect our legal rights and
        interests;
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        3: We need to process your data to comply with a legal or regulatory
        obligation.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We may also rely on your consent as a legal basis for using your
        Personal Data where we have expressly sought it for a specific purpose.
        If we rely on your consent to a use of your Personal Data, you have the
        right to change your mind at any time (but this will not affect any
        processing that has already taken place).
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        What happens when you do not provide necessary personal data?
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Where we need to process your Personal Data either to comply with law,
        or to perform the terms of a contract we have with you and you fail to
        provide that data when requested, we may not be able to perform the
        contract we have or are trying to enter into with you (for example, to
        provide you with the functionalities of the Services).
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In this case, we may have to stop providing you with our Services.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        How Information may be disclosed
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your information may be shared in the following cases:
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        1: to fulfill a request from the regulator or government entity with
        sufficient authority
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        2: to fulfill other legal obligations such as a request from a court
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        3: for regulatory reporting purposes
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Business transfer</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In the unlikely event that HashPay goes into administration or is
        acquired, a business transfer may occur. You consent to the successor
        company having access to the information maintained by HashPay,
        including customer Account Information, and such successor company would
        continue to be bound by this Privacy Policy unless and until it is
        amended.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Where your personal information is stored
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay is entirely committed to protecting the information we collect
        from you. We maintain appropriate administrative, technical and physical
        safeguards (i.e. firewalls, data encryption, competent security guards,
        etc).
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay is entirely committed to protecting the information we collect
        from you. We maintain appropriate administrative, technical and physical
        safeguards (i.e. firewalls, data encryption, competent security guards,
        etc).
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We are also planning to be certified by the International Organization
        for Standardization (ISO) on information security management.
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We are also planning to be certified by the International Organization
        for Standardization (ISO) on information security management.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay may transfer your personal data to a "white-list" of countries
        who are deemed to have adequate data protection laws under the NDPR
        Implementation Framework 2020.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Where HashPay transfers your personal data to countries outside the
        ‘white-list’, we shall ensure that informed consent is obtained from you
        and other relevant provisions of the NDPR are complied with, to
        guarantee that your personal data is adequately protected.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay is required to retain the details of transactions or payments
        you make via HashPay after the transaction is completed. We will store
        these transactions for the required period under the financial
        regulations of your jurisdiction.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        <View style={TermsStyles.margin9} />
        <Text style={TermsStyles.titleStyle}>
          Where your personal information is stored
        </Text>
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will retain your information for as long as your account is active,
        or it is reasonably needed for the purposes set out in How We Use Your
        Personal Data and Why unless you request that we remove your Personal
        Data as described in Your Rights Relating to Personal Data.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will only retain your Personal Data for so long as we reasonably need
        to use it for these purposes unless a longer retention period is
        required by law (for example for regulatory purposes).
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This may include keeping your Personal Data after you have deactivated
        your account for the period of time needed for us to pursue legitimate
        business interests, conduct audits, comply with (and demonstrate
        compliance with) legal obligations, resolve disputes and enforce our
        agreements.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This may include keeping your Personal Data after you have deactivated
        your account for the period of time needed for us to pursue legitimate
        business interests, conduct audits, comply with (and demonstrate
        compliance with) legal obligations, resolve disputes and enforce our
        agreements.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Also details of your transactions, if they are blockchain or
        cryptocurrency related may be recorded on our native and open
        distributed blockchain ledger called Kross blockchain or any such chains
        as the product might be built on.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>
        How we protect your personal data
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Personal Data breaches</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We have a duty to self-report personal data breaches to the National
        Information Technology Development Agency (NITDA) within 72 hours of
        knowledge of such breach.
      </Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We shall immediately notify you of any breach to your personal data
        where such breach will likely result in high risks to your freedoms and
        rights.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Links to Other Websites</Text>
      <View style={TermsStyles.margin6} />

      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This Privacy & Cookies Policy applies only to the services. The Services
        may contain links to other websites not operated or controlled by
        HashPay.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We are not responsible for the content, accuracy or opinions expressed
        in such websites, and such websites are not investigated, monitored or
        checked for accuracy or completeness by us.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Please remember that when you use a link to go from Services to another
        website, our Privacy and Cookies Policy is no longer in effect. Your
        browsing and interaction on any other website, including those that have
        a link on our site, is subject to the website’s own rules and policies.
        Such third parties may use their own cookies or other methods to collect
        information about you.
      </Text>

      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>Your responsibilities</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        You are responsible for protection of your password, seed words or PIN
        in its entirety as communicated in our Terms and Conditions. You must
        not share your HashPay password, seed words or PIN with anyone.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        We will never request for your PIN, seed words or password via email or
        SMS or any other means.
      </Text>

      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In the event you receive such communication, please disregard and
        contact us on: support@Hashgreed.com and 08128447600.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        In the event you share your password, PIN or seed words with a third
        party, you will be held responsible for the consequences.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        If you believe your password, seed or PIN has been compromised, please
        change it immediately and contact us. Also create a new account and move
        your blockchain based assets to that new account immediately.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>Changes to this Privacy Policy</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay may change its Privacy Policy from time to time, and at
        HashPay’s sole discretion. We will notify you when changes have been
        made. By continuing to use the mobile application or website after the
        change, you agree to accept the new policy.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>Contact Us</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay ensures that our day-to-day processes comply with this Privacy
        Policy
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        To contact us please send an email to support@Hashgreed.com and
        08128447600.
      </Text>
      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Applicable Law</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        This Privacy Policy shall be governed and construed in accordance with
        the relevant laws of the Federal Republic of Nigeria.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        These Terms Of Use (The "Terms") As Well As Any And All Specific Terms
        And Conditions For Each Of Our Products And Services, As Amended From
        Time To Time, Represent An Agreement Between You ("You", "Your" Or
        Collectively With Other Users, "Users") And HashPay; And Governs Your
        Use And Access To Our Services. Please Read These Terms Carefully To
        Ensure That You Understand Each Provision. By Downloading, Registering,
        Signing Into, Accessing, Browsing, Or Otherwise Using The Services,
        Whether As A Guest Or Registered User, Or Otherwise Accepting These
        Terms, You Are Signifying That You Have Read And Understood The Terms,
        And Agree To Be Bound By These Terms, Our Privacy And Cookie Policy And
        All Future Modifications To These
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Terms, As Well As To The Collection And Use Of Your Information As Set
        Out In Our Privacy And Cookie Policy
      </Text>
      <View style={TermsStyles.margin6} />
    </ScrollView>
  );
};

export default TermsConditions;
