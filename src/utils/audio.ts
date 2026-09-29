import { ASSETS } from '../assets';

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private bgMusic: HTMLAudioElement | null = null;
  public isMusicPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playThemeMusic() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.bgMusic) {
        this.bgMusic = new Audio(ASSETS.hedwigTheme);
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.45;
      }
      if (this.enabled) {
        this.bgMusic.play().then(() => {
          this.isMusicPlaying = true;
        }).catch(() => {
          // Autoplay blocked until user interaction
        });
      }
    } catch {
      // ignore
    }
  }

  public pauseThemeMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.isMusicPlaying = false;
    }
  }

  public toggleThemeMusic(): boolean {
    if (this.isMusicPlaying) {
      this.pauseThemeMusic();
    } else {
      this.playThemeMusic();
    }
    return this.isMusicPlaying;
  }

  // Soft magical chime / bell
  playChime(pitch: number = 520) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.85);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Page turn / click sound
  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }

  // Deep magical sorting resonance
  playSortingResonance() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [220, 277.18, 329.63, 440];
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.1);
        osc.frequency.exponentialRampToValueAtTime(f * 1.2, this.ctx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.1);
        osc.stop(this.ctx.currentTime + 1.5);
      });
    } catch {
      // ignore
    }
  }

  // Triumphant sorting reveal fanfare chord
  playRevealFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Major chord arpeggio
      const chord = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch {
      // ignore
    }
  }

  // Low dramatic hat growl/rumble – plays just before reveal
  playHatRumble() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Sub-bass growl
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const distortion = this.ctx.createWaveShaper();

      // Simple soft-clip distortion curve
      const curve = new Float32Array(256);
      for (let i = 0; i < 256; i++) {
        const x = (i * 2) / 256 - 1;
        curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
      }
      distortion.curve = curve;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(45, this.ctx.currentTime + 0.6);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.0);

      gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.1);

      osc.connect(distortion);
      distortion.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 1.2);

      // Overlay a high whisper shimmer
      const shimmer = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(880, this.ctx.currentTime);
      shimmer.frequency.linearRampToValueAtTime(1320, this.ctx.currentTime + 1.0);
      shimmerGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      shimmerGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.4);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(this.ctx.destination);
      shimmer.start(this.ctx.currentTime);
      shimmer.stop(this.ctx.currentTime + 1.3);
    } catch {
      // ignore
    }
  }

  // Development dept – bold ascending tech synth
  playDepartmentReveal_Development() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Synth lead: staccato ascending notes  C4 E4 G4 C5
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime + i * 0.13;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.07, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + 0.2);
      });

      // Punchy low hit at the end
      const t2 = this.ctx.currentTime + notes.length * 0.13;
      const kick = this.ctx.createOscillator();
      const kickG = this.ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(120, t2);
      kick.frequency.exponentialRampToValueAtTime(40, t2 + 0.25);
      kickG.gain.setValueAtTime(0.18, t2);
      kickG.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.4);
      kick.connect(kickG); kickG.connect(this.ctx.destination);
      kick.start(t2); kick.stop(t2 + 0.45);
    } catch { /* ignore */ }
  }

  // Design dept – dreamy pentatonic harp glissando
  playDepartmentReveal_Design() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Pentatonic scale: C D E G A  (two octaves up)
      const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
      pentatonic.forEach((freq, i) => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime + i * 0.07;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.06, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + 0.65);
      });
    } catch { /* ignore */ }
  }

  // Events dept – upbeat festive major fanfare with reverb
  playDepartmentReveal_Events() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Upbeat staccato major scale C4 → G4 → E4 → C5 + octave jump
      const melody = [261.63, 392.0, 329.63, 523.25, 659.25];
      melody.forEach((freq, i) => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime + i * 0.12;
        ['triangle', 'sine'].forEach((type, j) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.type = type as OscillatorType;
          osc.frequency.setValueAtTime(freq * (j === 1 ? 2 : 1), t);
          g.gain.setValueAtTime(j === 0 ? 0.07 : 0.03, t);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          osc.connect(g); g.connect(this.ctx.destination);
          osc.start(t); osc.stop(t + 0.25);
        });
      });
    } catch { /* ignore */ }
  }

  // Social Media dept – punchy modern synth arp with ring modulation feel
  playDepartmentReveal_SocialMedia() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Energetic short arpeggio: A3 C#4 E4 A4 C#5
      const arp = [220.0, 277.18, 329.63, 440.0, 554.37];
      arp.forEach((freq, i) => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime + i * 0.09;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.linearRampToValueAtTime(freq * 1.02, t + 0.06);
        g.gain.setValueAtTime(0.06, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + 0.18);
      });

      // Final two-note "boom-bap" accent
      const tFinal = this.ctx.currentTime + arp.length * 0.09 + 0.05;
      [110, 220].forEach((freq, i) => {
        if (!this.ctx) return;
        const t = tFinal + i * 0.15;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.2);
        g.gain.setValueAtTime(0.14, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + 0.35);
      });
    } catch { /* ignore */ }
  }

  // Dispatcher – call with the department id
  playDepartmentReveal(departmentId: string) {
    switch (departmentId) {
      case 'development':  this.playDepartmentReveal_Development(); break;
      case 'design':       this.playDepartmentReveal_Design();      break;
      case 'events':       this.playDepartmentReveal_Events();      break;
      case 'social_media': this.playDepartmentReveal_SocialMedia(); break;
      default:             this.playRevealFanfare();                 break;
    }
  }
}

export const sounds = new SoundEngine();
