import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop Garcia',
    conducting: 'Brother Rodriguez',
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Perez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [{ name: 'Congregation', topic: 'Testimonies', type: 'speaker' }],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Lopez',
    announcements: ['Ward Temple Trip: September 15th']
  },
  {
    id: 2,
    date: '2026-08-30',
    meetingType: 'regular',
    presiding: 'Bishop Garcia',
    conducting: 'Brother Smith',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Sunday School president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Redeemer of Israel', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Tithing Declaration begins in October']
  },
  {
    id: 3,
    date: '2026-08-23',
    meetingType: 'regular',
    presiding: 'Bishop Garcia',
    conducting: 'Bishop Garcia',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Johnson',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Brother Martinez', topic: 'Repentance', type: 'speaker' },
      { name: 'President Nelson (Stake)', topic: 'Gathering Israel', type: 'speaker' }
    ],
    closingHymn: { number: 270, title: 'I\'ll Go Where You Want Me to Go' },
    closingPrayer: 'Sister Gomez',
  },
  {
    id: 4,
    date: '2026-08-16',
    meetingType: 'general',
    presiding: 'Stake President',
    conducting: 'Stake President',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [{ name: 'Stake Presidency', topic: 'Stake Conference', type: 'speaker' }],
    closingHymn: { number: 2, title: 'The Spirit of God' },
    closingPrayer: 'Brother Kim',
  },
  {
    id: 5,
    date: '2026-08-09',
    meetingType: 'regular',
    presiding: 'Bishop Garcia',
    conducting: 'Brother Rodriguez',
    openingHymn: { number: 116, title: 'Come, Follow Me' },
    openingPrayer: 'Brother White',
    wardBusiness: [{ description: 'Release of Relief Society Counselor' }],
    stakeBusiness: false,
    sacramentHymn: { number: 177, title: '\'Tis Sweet to Sing the Matchless Love' },
    speakers: [
      { name: 'Sister Taylor', topic: 'Ministering', type: 'speaker' },
      { name: 'Brother Taylor', topic: 'Charity', type: 'speaker' }
    ],
    closingHymn: { number: 220, title: 'Lord, I Would Follow Thee' },
    closingPrayer: 'Sister Clark',
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}