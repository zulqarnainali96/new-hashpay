import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { styles } from "../";
import { TermsStyles } from "../Terms-and-Conditons";

const FAQ = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[TermsStyles.Container, { paddingTop: 12 }]}
    >
      <Text style={TermsStyles.titleStyle}>How does HashPay work?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay allows Nigerians pay for goods and services seamlessly and
        easily by sending HASH Naira which is our Naira stable coin.
      </Text>
      <View style={TermsStyles.margin9} />

      <Text style={TermsStyles.titleStyle}>What is HASH?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HASH or HASH Naira is our Naira pegged stable coin. 1 HASH = 1 Naira
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is KSS?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        As HashPay is built on our native Kross blockchain network, you need KSS
        for transaction fees when sending HASH, KSS or KUSD to others. KSS is
        the network currency for transaction fees. It costs only 0.001 KSS to
        send funds.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is KUSD?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        KUSD is our proxy dollar stable coin pegged 1:1 with USDT.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Users can convert their HASH Naira to KUSD, to store their money in
        crypto dollars. You can do this by selecting to convert your HASH to
        KUSD on the Buy HASH purchase form. Simply tap the Buy HASH button to be
        directed to the purchase form. Your Naira sent will be credited as KUSD
        if you select that option.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Where can i use HashPay?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        You can use HashPay at all our member businesses who accept HASH.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>Is HashPay regulated?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        HashPay is an internal tool designed by Vinekross Technologies Limited
        (RC 1883498) for members of our registered Multipurpose Cooperative
        Society, called Vinekross Royals Multipurpose Cooperative Society. By
        accepting to use HashPay or accept HASH, you are registering as a member
        of our cooperative society
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        What countries can i use HashPay in?
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Currently, only in Nigeria. Soon we will launch in other African
        countries
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is an address?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your address, which starts from “3K..” is your Kross chain address for
        receiving Kross based assets such as KSS, HASH, KUSD and nfts created on
        the Kross chain. This is the address you share with others for receiving
        tokens from them.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is Seed?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Your seed words are a group of words that authenticate your access into
        your HashPay wallet. Your seed words and Private key are for your eyes
        only. Never expose them to anyone else or your assets will be available
        to them to steal or own.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is Private Key?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Private keys are a string of characters derived from your seed words,
        they and your seed words must remain PRIVATE. Never share with anyone,
        even if they say they are from HashPay team.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        Where can i find my Seeds and Private Key?
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        You can find them on the Profile page. Simply tap on “Wallet
        Credentials” and your seed, private key, public key, address will be
        shown to you.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        It is important to note that HashPay does not have access to your Seed
        words or Private key. They are stored on your device but encrypted.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>
        What should i do if i mistakenly exposed my Seed words or Private Key?
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Immediately create a new HashPay account and copy the address, also make
        sure you copy and save the seed words. Then go back to the previous
        account and transfer all your Kross assets to this new account.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What is Nickname?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        Nickname, also called Alias is a pseudo name created by you on HashPay.
        Instead of sending the non-readable Kross address, you can create a
        short nickname and use that to receive transfers from other HashPay
        users. It makes it way easier to receive funds as others can easily
        remember it.
      </Text>

      <View style={TermsStyles.margin9} />
      <Text style={TermsStyles.titleStyle}>What are NFTs?</Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        NFT stands for Non fungible token. It is like a digital receipt that is
        created and stored on the blockchain. It can represent ownership of
        items such as real estate, art, music, collectibles, event tickets,
        rewards, experiences.
      </Text>
      <View style={TermsStyles.margin6} />
      <Text style={[styles.fontStyle, TermsStyles.paragraphStyle]}>
        On HashPay you can view your NFTs owned and use it to claim ownership of
        the value or asset it represents.
      </Text>
      <View style={TermsStyles.margin6} />
      <View style={TermsStyles.margin6} />
      <View style={TermsStyles.margin6} />
    </ScrollView>
  );
};

export default FAQ;
