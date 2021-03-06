export class Recipe {
  public name: string;
  public description: string;
  // auf den Pfad speichern, der auf das Bild verweist. bilder vom web -> also url - also string
  public imagePath: string;

  //damit wir dies mit dem neuen Schlüsselwort instanziieren
  // constructor selbst: ist einfach eine integrierte Funktion, die jede Klasse hat und die ausgeführt wird,sobald Sie eine neue
  //                    Instanz dieser Klasse erstellen.
  constructor(name: string, desc: string, imagePath: string) {
       // Im body dieses Konstruktors muss ich die Argumente, die wir hier erhalten, jetzt den Eigenschaften unseres Objekts
      // und den Eigenschaften unserer Klasse zuordnen

      this.name = name;
      this.description = desc;
      this.imagePath = imagePath;
  };
};
