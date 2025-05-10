
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const AIProfileBasic: React.FC = () => {
  // State for "Other" text inputs
  const [otherLanguage, setOtherLanguage] = useState('');
  const [otherFrustration, setOtherFrustration] = useState('');
  const [otherActivity, setOtherActivity] = useState('');
  const [otherMotivation, setOtherMotivation] = useState('');
  const [otherReason, setOtherReason] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">AI Profile Questionnaire</h2>
        <p className="text-muted-foreground">
          Help us understand your needs and preferences by answering these questions.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="demographics">
        <AccordionItem value="demographics" className="border rounded-md px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Demographics & Lifestyle</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-4">
            <div className="space-y-3">
              <Label className="text-base">1. What is your highest level of education?</Label>
              <RadioGroup defaultValue="no-formal">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-formal" id="education-1" />
                  <Label htmlFor="education-1">No formal education</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="primary" id="education-2" />
                  <Label htmlFor="education-2">Primary school</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high-school" id="education-3" />
                  <Label htmlFor="education-3">High school</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bachelor" id="education-4" />
                  <Label htmlFor="education-4">Bachelor's degree</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="master" id="education-5" />
                  <Label htmlFor="education-5">Master's degree or higher</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">2. What is your current occupation status?</Label>
              <RadioGroup defaultValue="retired">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retired" id="occupation-1" />
                  <Label htmlFor="occupation-1">Retired</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="occupation-2" />
                  <Label htmlFor="occupation-2">Working full-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="occupation-3" />
                  <Label htmlFor="occupation-3">Working part-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self-employed" id="occupation-4" />
                  <Label htmlFor="occupation-4">Self-employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-working" id="occupation-5" />
                  <Label htmlFor="occupation-5">Not currently working</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">3. How many people live in your household?</Label>
              <RadioGroup defaultValue="1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="household-1" />
                  <Label htmlFor="household-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="household-2" />
                  <Label htmlFor="household-2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="household-3" />
                  <Label htmlFor="household-3">3</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="household-4" />
                  <Label htmlFor="household-4">4</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-plus" id="household-5" />
                  <Label htmlFor="household-5">5 or more</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">4. What languages do you speak at home?</Label>
              <RadioGroup defaultValue="english">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="language-1" />
                  <Label htmlFor="language-1">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hindi" id="language-2" />
                  <Label htmlFor="language-2">Hindi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regional" id="language-3" />
                  <Label htmlFor="language-3">Regional language</Label>
                  <Input 
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="language-4" />
                  <Label htmlFor="language-4">Other</Label>
                  <Input 
                    value={otherLanguage}
                    onChange={(e) => setOtherLanguage(e.target.value)}
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="health" className="border rounded-md px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Health & Wellness</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-4">
            <div className="space-y-3">
              <Label className="text-base">5. How would you rate your overall health?</Label>
              <RadioGroup defaultValue="good">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="health-1" />
                  <Label htmlFor="health-1">Excellent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="health-2" />
                  <Label htmlFor="health-2">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="health-3" />
                  <Label htmlFor="health-3">Fair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="health-4" />
                  <Label htmlFor="health-4">Poor</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">6. Do you have any chronic health conditions?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="chronic-1" />
                  <Label htmlFor="chronic-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="chronic-2" />
                  <Label htmlFor="chronic-2">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not" id="chronic-3" />
                  <Label htmlFor="chronic-3">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">7. How often do you exercise each week?</Label>
              <RadioGroup defaultValue="1-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="exercise-1" />
                  <Label htmlFor="exercise-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="exercise-2" />
                  <Label htmlFor="exercise-2">1–2 times</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-4" id="exercise-3" />
                  <Label htmlFor="exercise-3">3–4 times</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-plus" id="exercise-4" />
                  <Label htmlFor="exercise-4">5 or more times</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">8. How many hours do you sleep on average per night?</Label>
              <RadioGroup defaultValue="7-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less-5" id="sleep-1" />
                  <Label htmlFor="sleep-1">Less than 5</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-6" id="sleep-2" />
                  <Label htmlFor="sleep-2">5–6</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7-8" id="sleep-3" />
                  <Label htmlFor="sleep-3">7–8</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more-8" id="sleep-4" />
                  <Label htmlFor="sleep-4">More than 8</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">9. How would you rate the quality of your sleep?</Label>
              <RadioGroup defaultValue="good">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-poor" id="sleep-quality-1" />
                  <Label htmlFor="sleep-quality-1">Very poor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="sleep-quality-2" />
                  <Label htmlFor="sleep-quality-2">Fair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="sleep-quality-3" />
                  <Label htmlFor="sleep-quality-3">Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="sleep-quality-4" />
                  <Label htmlFor="sleep-quality-4">Excellent</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">10. How often do you monitor your health (e.g., blood pressure, sugar)?</Label>
              <RadioGroup defaultValue="occasionally">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="monitor-1" />
                  <Label htmlFor="monitor-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="monitor-2" />
                  <Label htmlFor="monitor-2">Occasionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monitor-3" />
                  <Label htmlFor="monitor-3">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="monitor-4" />
                  <Label htmlFor="monitor-4">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="monitor-5" />
                  <Label htmlFor="monitor-5">Daily</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="technology" className="border rounded-md px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Technology Use & Comfort</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-4">
            <div className="space-y-3">
              <Label className="text-base">11. How comfortable are you using smartphones or computers?</Label>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-at-all" id="tech-comfort-1" />
                  <Label htmlFor="tech-comfort-1">Not at all comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="tech-comfort-2" />
                  <Label htmlFor="tech-comfort-2">Somewhat comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="tech-comfort-3" />
                  <Label htmlFor="tech-comfort-3">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-comfortable" id="tech-comfort-4" />
                  <Label htmlFor="tech-comfort-4">Very comfortable</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">12. How often do you use the internet?</Label>
              <RadioGroup defaultValue="daily">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="internet-1" />
                  <Label htmlFor="internet-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="internet-2" />
                  <Label htmlFor="internet-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="internet-3" />
                  <Label htmlFor="internet-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="internet-4" />
                  <Label htmlFor="internet-4">Daily</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">13. What frustrates you most about technology?</Label>
              <RadioGroup defaultValue="complicated">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complicated" id="tech-frustration-1" />
                  <Label htmlFor="tech-frustration-1">Too complicated/confusing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="readability" id="tech-frustration-2" />
                  <Label htmlFor="tech-frustration-2">Difficult to read or see</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="updates" id="tech-frustration-3" />
                  <Label htmlFor="tech-frustration-3">Hard to keep up with updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="privacy" id="tech-frustration-4" />
                  <Label htmlFor="tech-frustration-4">Privacy and security concerns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="support" id="tech-frustration-5" />
                  <Label htmlFor="tech-frustration-5">Lack of support/help</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cost" id="tech-frustration-6" />
                  <Label htmlFor="tech-frustration-6">Devices are too expensive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="tech-frustration-7" />
                  <Label htmlFor="tech-frustration-7">Other</Label>
                  <Input 
                    value={otherFrustration}
                    onChange={(e) => setOtherFrustration(e.target.value)}
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">14. Which devices do you use most often?</Label>
              <RadioGroup defaultValue="smartphone">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smartphone" id="device-1" />
                  <Label htmlFor="device-1">Smartphone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tablet" id="device-2" />
                  <Label htmlFor="device-2">Tablet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="computer" id="device-3" />
                  <Label htmlFor="device-3">Laptop/Computer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smartwatch" id="device-4" />
                  <Label htmlFor="device-4">Smartwatch/Fitness tracker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="device-5" />
                  <Label htmlFor="device-5">None</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">15. How do you prefer to learn about new technology?</Label>
              <RadioGroup defaultValue="family">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classes" id="tech-learn-1" />
                  <Label htmlFor="tech-learn-1">In-person classes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="tech-learn-2" />
                  <Label htmlFor="tech-learn-2">Online tutorials</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guides" id="tech-learn-3" />
                  <Label htmlFor="tech-learn-3">Printed guides/manuals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="tech-learn-4" />
                  <Label htmlFor="tech-learn-4">Family/friends</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="trial" id="tech-learn-5" />
                  <Label htmlFor="tech-learn-5">Trial and error</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="social" className="border rounded-md px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Social & Emotional Well-being</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-4">
            {/* Social and Emotional Well-being questions 16-20 */}
            <div className="space-y-3">
              <Label className="text-base">16. How often do you participate in social activities?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="social-1" />
                  <Label htmlFor="social-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="social-2" />
                  <Label htmlFor="social-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="social-3" />
                  <Label htmlFor="social-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="social-4" />
                  <Label htmlFor="social-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">17. How satisfied are you with your current social life?</Label>
              <RadioGroup defaultValue="satisfied">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-dissatisfied" id="social-sat-1" />
                  <Label htmlFor="social-sat-1">Very dissatisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dissatisfied" id="social-sat-2" />
                  <Label htmlFor="social-sat-2">Dissatisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfied" id="social-sat-3" />
                  <Label htmlFor="social-sat-3">Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="social-sat-4" />
                  <Label htmlFor="social-sat-4">Very satisfied</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">18. Do you feel you have enough emotional support?</Label>
              <RadioGroup defaultValue="most-times">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="always" id="support-1" />
                  <Label htmlFor="support-1">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="most-times" id="support-2" />
                  <Label htmlFor="support-2">Most of the time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="support-3" />
                  <Label htmlFor="support-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="support-4" />
                  <Label htmlFor="support-4">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="support-5" />
                  <Label htmlFor="support-5">Never</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">19. How do you usually cope with stress?</Label>
              <RadioGroup defaultValue="exercise">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exercise" id="stress-1" />
                  <Label htmlFor="stress-1">Exercise</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meditation" id="stress-2" />
                  <Label htmlFor="stress-2">Meditation/prayer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="talking" id="stress-3" />
                  <Label htmlFor="stress-3">Talking to someone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hobbies" id="stress-4" />
                  <Label htmlFor="stress-4">Hobbies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dont-know" id="stress-5" />
                  <Label htmlFor="stress-5">I don't know</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">20. How important is it for you to learn new things?</Label>
              <RadioGroup defaultValue="important">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-important" id="learn-1" />
                  <Label htmlFor="learn-1">Not important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="learn-2" />
                  <Label htmlFor="learn-2">Somewhat important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="important" id="learn-3" />
                  <Label htmlFor="learn-3">Important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-important" id="learn-4" />
                  <Label htmlFor="learn-4">Very important</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interests" className="border rounded-md px-4">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="text-base font-medium">Personal Interests & Preferences</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2 pb-4">
            <div className="space-y-3">
              <Label className="text-base">21. Which activities do you enjoy most?</Label>
              <RadioGroup defaultValue="reading">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="activity-1" />
                  <Label htmlFor="activity-1">Reading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gardening" id="activity-2" />
                  <Label htmlFor="activity-2">Gardening</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="traveling" id="activity-3" />
                  <Label htmlFor="activity-3">Traveling</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cooking" id="activity-4" />
                  <Label htmlFor="activity-4">Cooking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="games" id="activity-5" />
                  <Label htmlFor="activity-5">Playing games</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteering" id="activity-6" />
                  <Label htmlFor="activity-6">Volunteering</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="activity-7" />
                  <Label htmlFor="activity-7">Other</Label>
                  <Input 
                    value={otherActivity}
                    onChange={(e) => setOtherActivity(e.target.value)}
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">22. How often do you volunteer or help others?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="volunteer-1" />
                  <Label htmlFor="volunteer-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="volunteer-2" />
                  <Label htmlFor="volunteer-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="volunteer-3" />
                  <Label htmlFor="volunteer-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="volunteer-4" />
                  <Label htmlFor="volunteer-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">23. What motivates you to stay active?</Label>
              <RadioGroup defaultValue="health">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="health" id="motivation-1" />
                  <Label htmlFor="motivation-1">Health reasons</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="motivation-2" />
                  <Label htmlFor="motivation-2">Social interaction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enjoyment" id="motivation-3" />
                  <Label htmlFor="motivation-3">Enjoyment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doctor" id="motivation-4" />
                  <Label htmlFor="motivation-4">Doctor's advice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="motivation-5" />
                  <Label htmlFor="motivation-5">Other</Label>
                  <Input 
                    value={otherMotivation}
                    onChange={(e) => setOtherMotivation(e.target.value)}
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">24. How do you prefer to receive important information?</Label>
              <RadioGroup defaultValue="email">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="info-1" />
                  <Label htmlFor="info-1">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="info-2" />
                  <Label htmlFor="info-2">Phone call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="info-3" />
                  <Label htmlFor="info-3">Text message</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="notification" id="info-4" />
                  <Label htmlFor="info-4">In-app notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mail" id="info-5" />
                  <Label htmlFor="info-5">Printed mail</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">25. What would make you stop using an app or service?</Label>
              <RadioGroup defaultValue="complicated">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complicated" id="stop-1" />
                  <Label htmlFor="stop-1">Too complicated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="privacy" id="stop-2" />
                  <Label htmlFor="stop-2">Privacy concerns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usefulness" id="stop-3" />
                  <Label htmlFor="stop-3">Lack of usefulness</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ads" id="stop-4" />
                  <Label htmlFor="stop-4">Too many ads/notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tech-problems" id="stop-5" />
                  <Label htmlFor="stop-5">Technical problems</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="stop-6" />
                  <Label htmlFor="stop-6">Other</Label>
                  <Input 
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please specify" 
                    className="w-40 h-8 ml-2" 
                  />
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AIProfileBasic;
