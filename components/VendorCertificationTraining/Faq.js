import React from 'react'
// import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner'
// import Footer from '@/components/_App/Footer';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion'
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import SubscribeForm from '@/components/Common/SubscribeForm'
// import MediaQuery from 'react-responsive' //接続機械を調べる、pc or mobile or tablet etc...portrait...

resetIdCounter()

const Faq = () => {
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <div className="section-title mt-5">
        {/* <span className="sub-title">Frequently Asked Questions</span> */}
        <h1 style={{ fontWeight: 'bold' }}>FAQ</h1>
        <span className="sub-title">よくある質問</span>
      </div>

      <div className="faq-area pb-100">
        <div className="container">
          <div className="tab faq-accordion-tab">
            <Tabs>
              {/* <MediaQuery query="(min-width: 767px)"> */}{' '}
              <TabList>
                <Tab>
                  <i className="bx bxs-badge-dollar"></i>
                  <span>【入会・料金】</span>
                </Tab>
                <Tab>
                  <i className="bx bx-face"></i>
                  <span>【講師】</span>
                </Tab>
                <Tab>
                  <i className="bx bx-flag"></i>
                  <span>【レッスン・課題】</span>
                </Tab>
                <Tab>
                  <i className="bx bx-book-open"></i>
                  <span>【カリキュラム】</span>
                </Tab>
                <Tab>
                  <i className="bx bx-up-arrow"></i>

                  <span>【レベルアップ】</span>
                </Tab>
              </TabList>
              {/* </MediaQuery> */}
              {/* <MediaQuery query="(max-width: 767px)">
                <TabList>
                  <Tab style={{ fontSize: '20px', width: '100%' }}>
                
                    <span>【入会・料金】</span>
                  </Tab>
                  <Tab style={{ fontSize: '20px', width: '100%' }}>
           
                    <span>【講師】</span>
                  </Tab>
                  <Tab style={{ fontSize: '20px', width: '100%' }}>
                   
                    <span>【レッスン・課題】</span>
                  </Tab>
                  <Tab style={{ fontSize: '20px', width: '100%' }}>
                   
                    <span>【カリキュラム】</span>
                  </Tab>
                  <Tab style={{ fontSize: '20px', width: '100%' }}>
                  

                    <span>【レベルアップ】</span>
                  </Tab>
                </TabList>
              </MediaQuery> */}
              <TabPanel>
                <div className="faq-accordion">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          お月謝を教えてください。
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          毎月のお月謝はそれぞれのコースによります。また、ネイティブ先生の場合、為替変動による価格訂正のご案内が定期的にございますことご了承ください。詳しくは、
                          <Link href="/engLibPrice">
                            <a>こちらのページをご参考にしてください。</a>
                          </Link>
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="b">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          入会する前に体験レッスンは可能ですか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          もちろん可能です。現在無料体験イベントを実施していますので、ぜひご参加ください。無料体験後に入会を無理強いすることは一切ありません。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="c">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          入会に年齢制限やレベル制限はありまますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          イングリブの対象学年は４歳〜１８歳となっていますが、現在大学生もレッスンを受けています。また、イングリブでは英語が全くの初心者の生徒さんから海外大学でも通用するレベルの生徒さんまで幅広く在籍しています。小さい子供たちの入会の判断は、無料体験時の担当先生が判断する形になりますので、まずはお気軽に無料体験にご参加ください。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="d">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          入会時に子供のレベルはどのように判断されますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          英語経験者の生徒さんにはイングリブ独自のレベルテストを実施しています。このテストで英検やLEXILEなどの英語試験の目安レベルも判断することができます。英語が全く初めての生徒さんはフォニックスからスタートし、それ以外の生徒さんにはそれぞれに合ったリーディング教材を提案していきます。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          決済方法を教えてください。
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          現在、銀行の口座へのお振り込みをお願いしています。翌月分のお月謝及び必要に応じて教材費を毎月25日から同月末までにお手続きいただくようお願いしています。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="faq-accordion">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          どんな先生がレッスンをしていますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          子供に教えることが好きで、第二言語としての英語学習の特徴を理解した日英バイリンガルの先生がインプットプログラムを、リアルタイム添削ができるネイティブレベルの先生が発音や文章力をつけるアウトプットプログラムを担当しています。イングリブの全ての講師は、定期的な研修を通して『メタ認知式英感習得法』を熟知しており、生徒の脳に正しい知識を長期記憶としてインプットしていくノウハウをレッスン内で実践しています。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="b">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          先生と相性が合わない場合、先生を変更することは可能ですか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          はい、ご希望に応じて調整致しますので、ご希望の２週間前までにご相談ください。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    {/* <AccordionItem uuid="c">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a study abroad program on eDemy.com?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="d">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a school where I want to study?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Am I eligible for admission?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem> */}
                  </Accordion>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="faq-accordion">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          英語は今まで習ったことのない、全く初心者ですが、大丈夫ですか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          全く問題ありません。ABCからスタートしてる生徒さんが４０％くらいにいます。フォニックスからスタートし、すぐに簡単な絵本が読めるようになります。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="b">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          どのようなレッスンの内容になってますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          オンラインレッスンでは生徒が１週間の課題の成果を先生に１対１で発表します。先生は、生徒の理解が足りない部分を的確な質問をすることで生徒の脳に確実にインプットしていきます。詳しくは、インプットプログラムとアウトプットプログラムをご覧ください。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="c">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          週一回のレッスンで望む結果はでますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          イングリブの独自開発カリキュラムとオンライン学習システムは、忙しい生徒さんの時間を無駄にしない、効率的かつ効果的なプログラムです。生徒さんが自ら毎日30分効果的に英語知識をインプットすることを日課とし、それを週1回のオンラインレッスンで発表し、先生が理解習熟度を確認する一連のステップにより、１週間の自宅学習で得た知識を長期記憶に変え、確実に脳にインプットしていきます。詳しくは、『カリキュラムについて』をご参照ください。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="d">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          グループレッスンはありませんか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          プログラムの特性上、生徒さんそれぞれのレベルや特徴に合った内容で効果を得るため、インプットプログラムおよびアウトプットプログラムともにグループレッスンは設定していません。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          毎日どのくらいの課題をこなす必要がありますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          子供のレベルや性格にもよりますが、インプットプログラムではリーディングとシャドウイングを基本に毎日30分ほどで終わる課題をオンライン学習システム(eOLS)のステップに沿ってやります。イングリブオンライン学習システムには、子供が課題をやりたくなる仕組みと効果的にインプットする仕組みが詰まっています。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          私は英語が得意ではなく子供の課題のサポートができるか不安です。
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          私たちのカリキュラムは、子供自身が毎日オンライン学習システムのステップを通して課題をこなします。これは、長年の研究を通して培ったノウハウ『メタ認知英感習得法』を取り入れた自社開発の学習システムです。保護者様にはシステム環境を整えていただくこと、子供とのコミュニケーションをとっていただくこと以外、イングリブの課題自体のサポートは求めていません。逆に、生徒にはたくさん間違えて、それに自分自身で気づき、行動をするため、保護者様のお手を借りず自分自身で全ての過程をやることを提案しています。お困りの際には、保護者様のご相談サポートも今後案内していく予定です。{' '}
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="faq-accordion">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          カリキュラムを詳しく教えてください。
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          イングリブのカリキュラムは全てオンラインで行われるインプットプログラムとアウトプットプログラムの２種類からなります。まずは、すべてのレベルの生徒さんに英語スキルを上げるための基本となるインプットプログラムを推奨しています。インプットプログラムでは、イングリブの長年の研究を通して『メタ認知式教育法』を重視したイングリブオンライン学習システムのステップに沿って、生徒は自分のレベルに合った本を音源を聴きながら音読の練習をしていき、これに1つの動画を観ながら音を真似するシャドーイングの練習をし、単語や文章など新しい表現を音と目を通してインプットしていきます。週1回のレッスン内では、イングリブの『メタ認知式英感習得法』のノウハウを熟知した日英バイリンガルの先生が、生徒の理解度をチェックし、確実にインプットしていきます。また、アウトプットプログラムについては、ある程度のインプット量が身についているレベルの生徒さん達を対象に、その知識を使って自分自身で文章を作成していきます。アウトプットプログラムにはShow
                          and
                          TellコースとDiscussionコースがあります。詳しくはアウトプットプログラムについての詳細をご参照ください。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="b">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          アウトプットプログラムではどんなことを学びますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          アウトプットプログラムは、生徒がインプットしてきた知識を使って文章を作成し、発表する能力を高めるためのプログラムで、Show
                          and
                          TellコースとDiscussionコースという２種類の学び方があります。Show
                          and
                          Tellコースは、小学校4年生以上程度で且つある程度のインプット量を持った生徒さん向けで、生徒さん自身がレッスンで発表してみたいトピックを決め、イングリブオンライン学習システム上のステップに沿って、マインドマップを作成後、アウトラインを作成し、一つの文章にまとめ上げ、レッスン内で発表するための課題をやります。また、Discussionコースは、もう少しリーディングレベルが高い生徒たち向けで、TED
                          EDUCATIONのビデオ教材を使用し、イングリブオンライン学習システム上のステップに沿って、シャドーイング練習やいくつかの質問に文章で答え、レッスン内で先生と討論するための準備をします。いずれのコースも、週1回または月2回のレッスン内では、自分の課題を先生に発表し、グーグルドックの２方向コミュニケーションを使用しながらリアルタイム添削を一緒にしていきます。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="c">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          子供の英語レベルはどのように判断されますか？
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          イングリブでは英語経験者の生徒の入会時、また在籍中定期的にイングリブ独自開発レベルテストを実施しています。このレベルテストにより、英検やLEXILEなど各種英語試験においてもリーディングレベルの目安がわかります。
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    {/* <AccordionItem uuid="d">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a study abroad program on eDemy.com?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a school where I want to study?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem> */}
                  </Accordion>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="faq-accordion">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How can I contact a school directly?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="b">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Where should I study abroad?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="c">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a study abroad program on eDemy.com?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="d">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          How do I find a school where I want to study?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>

                    <AccordionItem uuid="e">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Am I eligible for admission?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          You can contact a school by filling out a{' '}
                          <a href="contact.html">“Contact Us”</a> form. This
                          form can be found to the right of both the institute
                          and education program profiles and also at the bottom
                          of these profiles.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      {/* <SubscribeForm /> */}
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default Faq
