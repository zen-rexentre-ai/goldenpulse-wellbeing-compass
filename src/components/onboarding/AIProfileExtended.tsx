
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const AIProfileExtended: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Extended Profile Questionnaire</h2>
        <p className="text-muted-foreground mb-4">
          These specific questionnaires will help us tailor content and recommendations 
          to your needs and interests.
        </p>
      </div>

      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="volunteering">Volunteering</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">1. Do you follow any specific diet?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="diet-1" />
                  <Label htmlFor="diet-1">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="diet-2" />
                  <Label htmlFor="diet-2">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="diet-3" />
                  <Label htmlFor="diet-3">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low-carb" id="diet-4" />
                  <Label htmlFor="diet-4">Low-carb</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diabetic" id="diet-5" />
                  <Label htmlFor="diet-5">Diabetic-friendly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="diet-6" />
                  <Label htmlFor="diet-6">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">2. How many meals do you eat per day?</Label>
              <RadioGroup defaultValue="3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="meals-1" />
                  <Label htmlFor="meals-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="meals-2" />
                  <Label htmlFor="meals-2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="meals-3" />
                  <Label htmlFor="meals-3">3</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more-3" id="meals-4" />
                  <Label htmlFor="meals-4">More than 3</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">3. How often do you eat fruits and vegetables?</Label>
              <RadioGroup defaultValue="daily">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="fruits-1" />
                  <Label htmlFor="fruits-1">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="fruits-2" />
                  <Label htmlFor="fruits-2">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="fruits-3" />
                  <Label htmlFor="fruits-3">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="every-meal" id="fruits-4" />
                  <Label htmlFor="fruits-4">With every meal</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">4. How much water do you drink daily?</Label>
              <RadioGroup defaultValue="1-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less-1" id="water-1" />
                  <Label htmlFor="water-1">Less than 1 litre</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="water-2" />
                  <Label htmlFor="water-2">1–2 litres</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-3" id="water-3" />
                  <Label htmlFor="water-3">2–3 litres</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more-3" id="water-4" />
                  <Label htmlFor="water-4">More than 3 litres</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* Continue with remaining nutrition questions 5-10 */}
            <div className="space-y-3">
              <Label className="text-base">5. How often do you eat out or order food?</Label>
              <RadioGroup defaultValue="rarely">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="eat-out-1" />
                  <Label htmlFor="eat-out-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="eat-out-2" />
                  <Label htmlFor="eat-out-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="eat-out-3" />
                  <Label htmlFor="eat-out-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="eat-out-4" />
                  <Label htmlFor="eat-out-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">6. Do you have any food allergies or intolerances?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="allergies-1" />
                  <Label htmlFor="allergies-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="allergies-2" />
                  <Label htmlFor="allergies-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">7. How often do you consume sugary drinks?</Label>
              <RadioGroup defaultValue="rarely">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="sugary-1" />
                  <Label htmlFor="sugary-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="sugary-2" />
                  <Label htmlFor="sugary-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="sugary-3" />
                  <Label htmlFor="sugary-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="sugary-4" />
                  <Label htmlFor="sugary-4">Daily</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">8. Do you track your food intake?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="track-1" />
                  <Label htmlFor="track-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="track-2" />
                  <Label htmlFor="track-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">9. How confident are you in preparing healthy meals?</Label>
              <RadioGroup defaultValue="confident">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-at-all" id="meal-conf-1" />
                  <Label htmlFor="meal-conf-1">Not at all</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="meal-conf-2" />
                  <Label htmlFor="meal-conf-2">Somewhat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="confident" id="meal-conf-3" />
                  <Label htmlFor="meal-conf-3">Confident</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-confident" id="meal-conf-4" />
                  <Label htmlFor="meal-conf-4">Very confident</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">10. What is your biggest challenge with healthy eating?</Label>
              <RadioGroup defaultValue="time">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="time" id="challenge-1" />
                  <Label htmlFor="challenge-1">Lack of time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="knowledge" id="challenge-2" />
                  <Label htmlFor="challenge-2">Lack of knowledge</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cost" id="challenge-3" />
                  <Label htmlFor="challenge-3">Cost</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="taste" id="challenge-4" />
                  <Label htmlFor="challenge-4">Taste preferences</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="challenge-5" />
                  <Label htmlFor="challenge-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="volunteering" className="space-y-6">
          {/* Volunteering & Community questions 1-10 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">1. Have you volunteered in the past year?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="vol-past-1" />
                  <Label htmlFor="vol-past-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="vol-past-2" />
                  <Label htmlFor="vol-past-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">2. What type of volunteering do you prefer?</Label>
              <RadioGroup defaultValue="teaching">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teaching" id="vol-type-1" />
                  <Label htmlFor="vol-type-1">Teaching</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="vol-type-2" />
                  <Label htmlFor="vol-type-2">Administration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="event" id="vol-type-3" />
                  <Label htmlFor="vol-type-3">Event support</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fundraising" id="vol-type-4" />
                  <Label htmlFor="vol-type-4">Fundraising</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="vol-type-5" />
                  <Label htmlFor="vol-type-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">3. How often would you like to volunteer?</Label>
              <RadioGroup defaultValue="monthly">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="vol-freq-1" />
                  <Label htmlFor="vol-freq-1">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="vol-freq-2" />
                  <Label htmlFor="vol-freq-2">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="vol-freq-3" />
                  <Label htmlFor="vol-freq-3">Occasionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-interested" id="vol-freq-4" />
                  <Label htmlFor="vol-freq-4">Not interested</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">4. What motivates you to volunteer?</Label>
              <RadioGroup defaultValue="giving-back">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="giving-back" id="vol-motiv-1" />
                  <Label htmlFor="vol-motiv-1">Giving back</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="vol-motiv-2" />
                  <Label htmlFor="vol-motiv-2">Social connection</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="skill" id="vol-motiv-3" />
                  <Label htmlFor="vol-motiv-3">Skill development</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfaction" id="vol-motiv-4" />
                  <Label htmlFor="vol-motiv-4">Personal satisfaction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="vol-motiv-5" />
                  <Label htmlFor="vol-motiv-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">5. Do you prefer volunteering in-person or online?</Label>
              <RadioGroup defaultValue="in-person">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="vol-mode-1" />
                  <Label htmlFor="vol-mode-1">In-person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="vol-mode-2" />
                  <Label htmlFor="vol-mode-2">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="vol-mode-3" />
                  <Label htmlFor="vol-mode-3">Both</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-preference" id="vol-mode-4" />
                  <Label htmlFor="vol-mode-4">No preference</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* Continue with remaining volunteering questions 6-10 */}
            <div className="space-y-3">
              <Label className="text-base">6. What skills can you offer as a volunteer?</Label>
              <RadioGroup defaultValue="teaching">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teaching" id="vol-skills-1" />
                  <Label htmlFor="vol-skills-1">Teaching</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="organizing" id="vol-skills-2" />
                  <Label htmlFor="vol-skills-2">Organizing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="technical" id="vol-skills-3" />
                  <Label htmlFor="vol-skills-3">Technical skills</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="communication" id="vol-skills-4" />
                  <Label htmlFor="vol-skills-4">Communication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="vol-skills-5" />
                  <Label htmlFor="vol-skills-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">7. How important is recognition for your volunteering?</Label>
              <RadioGroup defaultValue="somewhat">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not" id="vol-recog-1" />
                  <Label htmlFor="vol-recog-1">Not important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="vol-recog-2" />
                  <Label htmlFor="vol-recog-2">Somewhat important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="important" id="vol-recog-3" />
                  <Label htmlFor="vol-recog-3">Important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very" id="vol-recog-4" />
                  <Label htmlFor="vol-recog-4">Very important</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">8. What prevents you from volunteering more?</Label>
              <RadioGroup defaultValue="time">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="time" id="vol-prevent-1" />
                  <Label htmlFor="vol-prevent-1">Lack of time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="health" id="vol-prevent-2" />
                  <Label htmlFor="vol-prevent-2">Health issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="opportunities" id="vol-prevent-3" />
                  <Label htmlFor="vol-prevent-3">Lack of opportunities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transportation" id="vol-prevent-4" />
                  <Label htmlFor="vol-prevent-4">Transportation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="vol-prevent-5" />
                  <Label htmlFor="vol-prevent-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">9. Would you like to receive updates about volunteering opportunities?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="vol-updates-1" />
                  <Label htmlFor="vol-updates-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="vol-updates-2" />
                  <Label htmlFor="vol-updates-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">10. How satisfied are you with your current volunteering experience?</Label>
              <RadioGroup defaultValue="satisfied">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-dissatisfied" id="vol-satisfaction-1" />
                  <Label htmlFor="vol-satisfaction-1">Very dissatisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dissatisfied" id="vol-satisfaction-2" />
                  <Label htmlFor="vol-satisfaction-2">Dissatisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfied" id="vol-satisfaction-3" />
                  <Label htmlFor="vol-satisfaction-3">Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="vol-satisfaction-4" />
                  <Label htmlFor="vol-satisfaction-4">Very satisfied</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="technology" className="space-y-6">
          {/* Technology Use & Learning questions 1-12 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">1. How often do you try new apps or devices?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="tech-try-1" />
                  <Label htmlFor="tech-try-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="tech-try-2" />
                  <Label htmlFor="tech-try-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="tech-try-3" />
                  <Label htmlFor="tech-try-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="tech-try-4" />
                  <Label htmlFor="tech-try-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">2. What is your preferred device for internet use?</Label>
              <RadioGroup defaultValue="smartphone">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smartphone" id="tech-device-1" />
                  <Label htmlFor="tech-device-1">Smartphone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tablet" id="tech-device-2" />
                  <Label htmlFor="tech-device-2">Tablet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="laptop" id="tech-device-3" />
                  <Label htmlFor="tech-device-3">Laptop/Desktop</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smart-tv" id="tech-device-4" />
                  <Label htmlFor="tech-device-4">Smart TV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="tech-device-5" />
                  <Label htmlFor="tech-device-5">None</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* The first 6 technology questions continued */}
            <div className="space-y-3">
              <Label className="text-base">3. How do you usually learn new technology?</Label>
              <RadioGroup defaultValue="self">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id="tech-learn-1" />
                  <Label htmlFor="tech-learn-1">Self-taught</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="tech-learn-2" />
                  <Label htmlFor="tech-learn-2">Family/friends</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="tech-learn-3" />
                  <Label htmlFor="tech-learn-3">Online tutorials</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="classes" id="tech-learn-4" />
                  <Label htmlFor="tech-learn-4">In-person classes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="guides" id="tech-learn-5" />
                  <Label htmlFor="tech-learn-5">Printed guides</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">4. What is your biggest barrier to using technology?</Label>
              <RadioGroup defaultValue="confidence">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="confidence" id="tech-barrier-1" />
                  <Label htmlFor="tech-barrier-1">Lack of confidence</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="interest" id="tech-barrier-2" />
                  <Label htmlFor="tech-barrier-2">Lack of interest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cost" id="tech-barrier-3" />
                  <Label htmlFor="tech-barrier-3">Cost</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accessibility" id="tech-barrier-4" />
                  <Label htmlFor="tech-barrier-4">Accessibility issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="privacy" id="tech-barrier-5" />
                  <Label htmlFor="tech-barrier-5">Privacy concerns</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">5. How do you feel about online privacy?</Label>
              <RadioGroup defaultValue="somewhat">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-concerned" id="tech-privacy-1" />
                  <Label htmlFor="tech-privacy-1">Not concerned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="tech-privacy-2" />
                  <Label htmlFor="tech-privacy-2">Somewhat concerned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very" id="tech-privacy-3" />
                  <Label htmlFor="tech-privacy-3">Very concerned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unsure" id="tech-privacy-4" />
                  <Label htmlFor="tech-privacy-4">Unsure</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">6. How often do you use social media?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="social-media-1" />
                  <Label htmlFor="social-media-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="social-media-2" />
                  <Label htmlFor="social-media-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="social-media-3" />
                  <Label htmlFor="social-media-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="social-media-4" />
                  <Label htmlFor="social-media-4">Daily</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* The remaining technology questions */}
            <div className="space-y-3">
              <Label className="text-base">7. Are you interested in learning more about technology?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="tech-interest-1" />
                  <Label htmlFor="tech-interest-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="tech-interest-2" />
                  <Label htmlFor="tech-interest-2">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="tech-interest-3" />
                  <Label htmlFor="tech-interest-3">Maybe</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">8. What type of tech support do you prefer?</Label>
              <RadioGroup defaultValue="phone">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="tech-support-1" />
                  <Label htmlFor="tech-support-1">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chat" id="tech-support-2" />
                  <Label htmlFor="tech-support-2">Chat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="tech-support-3" />
                  <Label htmlFor="tech-support-3">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="tech-support-4" />
                  <Label htmlFor="tech-support-4">In-person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-preference" id="tech-support-5" />
                  <Label htmlFor="tech-support-5">No preference</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mental-health" className="space-y-6">
          {/* Mental Health & Well-being questions 1-10 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">1. How often do you feel stressed?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="stress-1" />
                  <Label htmlFor="stress-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="stress-2" />
                  <Label htmlFor="stress-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="stress-3" />
                  <Label htmlFor="stress-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="stress-4" />
                  <Label htmlFor="stress-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">2. How do you usually relax?</Label>
              <RadioGroup defaultValue="reading">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="relax-1" />
                  <Label htmlFor="relax-1">Reading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meditation" id="relax-2" />
                  <Label htmlFor="relax-2">Meditation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="socializing" id="relax-3" />
                  <Label htmlFor="relax-3">Socializing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exercise" id="relax-4" />
                  <Label htmlFor="relax-4">Exercise</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tv" id="relax-5" />
                  <Label htmlFor="relax-5">Watching TV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="relax-6" />
                  <Label htmlFor="relax-6">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">3. Do you practice mindfulness or meditation?</Label>
              <RadioGroup defaultValue="occasionally">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regularly" id="mindfulness-1" />
                  <Label htmlFor="mindfulness-1">Yes, regularly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="mindfulness-2" />
                  <Label htmlFor="mindfulness-2">Occasionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tried" id="mindfulness-3" />
                  <Label htmlFor="mindfulness-3">Tried but stopped</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="mindfulness-4" />
                  <Label htmlFor="mindfulness-4">Never</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">4. How would you rate your mood most days?</Label>
              <RadioGroup defaultValue="somewhat-positive">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-negative" id="mood-1" />
                  <Label htmlFor="mood-1">Very negative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat-negative" id="mood-2" />
                  <Label htmlFor="mood-2">Somewhat negative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="mood-3" />
                  <Label htmlFor="mood-3">Neutral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat-positive" id="mood-4" />
                  <Label htmlFor="mood-4">Somewhat positive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-positive" id="mood-5" />
                  <Label htmlFor="mood-5">Very positive</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">5. Do you feel you have someone to talk to when needed?</Label>
              <RadioGroup defaultValue="most-times">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="always" id="talk-1" />
                  <Label htmlFor="talk-1">Yes, always</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="most-times" id="talk-2" />
                  <Label htmlFor="talk-2">Most of the time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="talk-3" />
                  <Label htmlFor="talk-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="talk-4" />
                  <Label htmlFor="talk-4">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="talk-5" />
                  <Label htmlFor="talk-5">Never</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* The rest of mental health questions */}
            <div className="space-y-3">
              <Label className="text-base">6. How often do you engage in creative activities (art, music, writing)?</Label>
              <RadioGroup defaultValue="sometimes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="creative-1" />
                  <Label htmlFor="creative-1">Never</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="creative-2" />
                  <Label htmlFor="creative-2">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sometimes" id="creative-3" />
                  <Label htmlFor="creative-3">Sometimes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="often" id="creative-4" />
                  <Label htmlFor="creative-4">Often</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">7. How important is mental health to you?</Label>
              <RadioGroup defaultValue="important">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not" id="mental-health-1" />
                  <Label htmlFor="mental-health-1">Not important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="somewhat" id="mental-health-2" />
                  <Label htmlFor="mental-health-2">Somewhat important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="important" id="mental-health-3" />
                  <Label htmlFor="mental-health-3">Important</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very" id="mental-health-4" />
                  <Label htmlFor="mental-health-4">Very important</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">8. Have you ever sought professional help for mental health?</Label>
              <RadioGroup defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="professional-1" />
                  <Label htmlFor="professional-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="professional-2" />
                  <Label htmlFor="professional-2">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not" id="professional-3" />
                  <Label htmlFor="professional-3">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">9. What is your biggest challenge in maintaining mental well-being?</Label>
              <RadioGroup defaultValue="time">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="time" id="challenge-mental-1" />
                  <Label htmlFor="challenge-mental-1">Lack of time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stigma" id="challenge-mental-2" />
                  <Label htmlFor="challenge-mental-2">Stigma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="access" id="challenge-mental-3" />
                  <Label htmlFor="challenge-mental-3">Access to resources</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="motivation" id="challenge-mental-4" />
                  <Label htmlFor="challenge-mental-4">Motivation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="challenge-mental-5" />
                  <Label htmlFor="challenge-mental-5">Other</Label>
                  <Input placeholder="Please specify" className="w-40 h-8 ml-2" />
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">10. Would you like to receive resources on mental health and well-being?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mental-resources-1" />
                  <Label htmlFor="mental-resources-1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mental-resources-2" />
                  <Label htmlFor="mental-resources-2">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIProfileExtended;
