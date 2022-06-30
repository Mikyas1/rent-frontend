<template>
  <v-container>
    <v-skeleton-loader v-if="!Receiver.loaded" type="table"></v-skeleton-loader>
    <dir v-else>
        <p>
            <v-btn
                v-show="show_btn"
                large
                color="secondary white--text mb-2"
                @click="print"
                class="mr-3"
              >
                <v-icon small>fa-check-circle</v-icon>
                <span class="ml-2 text-capitalize">Print Contract</span>
              </v-btn>
        </p>
        <!-- {{Receiver.data.rent_request.property.address}} -->
      <h2>CONTRACT OF LEASE</h2>

      <div style="height: 25px"></div>

      <p>
        This contract of lease is made this _____________ day of the month of <br/>
        ______<span class="under">{{moment(Receiver.data.created_at).format('ll')}}</span>_______,. At {{Receiver.data.rent_request.property.address.region}}, 
        {{Receiver.data.rent_request.property.address.county}}.
      </p>

      <div style="height: 25px"></div>

      <h2>B Y&nbsp; A N D &nbsp;  B E T W E E N</h2>

      <div style="height: 25px"></div>

      <p>
        _______<span class="text-capitalize under">{{Receiver.data.requester.first_name}} {{Receiver.data.requester.last_name}}</span>_______, 
        at present residing in Woreda 
        __{{Receiver.data.rent_request.property.address.woreda}}__
        Kebele__{{Receiver.data.rent_request.property.address.kebele}}__, House No. _____ whose residence telephone number is
        ______________hereinafter referred to as the “LESSOR” (which expression
        where the context shall so admit, shall mean and include her heirs,
        successors – in-interest, legal representatives, assignees and nominees)
        on THE ONE PART:
      </p>

      <div style="height: 25px"></div>

      <h2>AND</h2>

      <div style="height: 25px"></div>

      <p>
        Mrs._________<span class="text-capitalize under">{{Receiver.data.owner.first_name}} {{Receiver.data.owner.last_name}}</span>____________, ID#__________________, hereinafter
        referred to as the “LESSEE” (which expression where the context shall so
        admit, shall mean and include his successors-in-interest, assignees,
        nominees, and legal representatives) on THE OTHER PART, witnesses as
        follows:-
      </p>

      <div style="height: 25px"></div>

      <p>
        WHEREAS the “LESSOR” is the owner and is absolutely seized and possessed
        of or otherwise well and sufficiently entitled to premises situated at
        Woreda 
        __{{Receiver.data.rent_request.property.address.woreda}}_, Kebele 
        __{{Receiver.data.rent_request.property.address.kebele}}__, House No._____, Addis Ababa,
        Ethiopia together with the fittings, fixtures and appurtenances
        (specified in Appendix one of this contract), hereunto belonging and
        hereinafter called the “House”;
      </p>

      <div style="height: 25px"></div>

      <p>
        And WHEREAS the “LESSEE” being in need of such premises for residential
        purpose has offered to take, and the “LESSOR” has agreed to give, on
        lease the house for a period of ____<span class="under">{{Receiver.data.rent_request.rent_duration}} months</span>____
      </p>

      <div style="height: 25px"></div>

      <p>
        NOW, THEREFORE, This contract witnesses and the parties hereto mutually
        agree as follows:-
      </p>

      <div style="height: 25px"></div>

      <h2>ARTICLE V</h2>

      <h2>Obligations of the Lessee</h2>

      <p>
        1. Upon termination of this contract, the lessee shall hand over the
        house to the lessor or his designate in good condition, reasonable wear
        and tear expected.
      </p>
      <div style="height: 25px"></div>

      <p>
        2. The lessee shall cover costs of utilities such as water, electricity,
        telephone charges, municipal garbage disposal fees starting from the
        date when he takes possession of the house from the lessor and until the
        house is vacated by him.
      </p>
      <div style="height: 25px"></div>

      <h2>ARTICLE VI</h2>
      <h2>Modifications or Alterations</h2>

      <div style="height: 25px"></div>

      <p>
        The lessee shall not modify, alter or make expansions to the house
        without prior written approval from the lessor.
      </p>

      <div style="height: 25px"></div>

      <h2>ARTICLE VII</h2>
      <h2>Warranties by the Lessor</h2>
      <div style="height: 25px"></div>

      <p>
        1. The lessor warrants that the house so leased is his property. The
        lessor shall furnish or otherwise provide to the lessee during the lease
        term the following: • Electricity supply • Water supply • Telephone •
        Sewage Disposal The lessor will not be responsible for interruptions
        that are beyond his control to utilities supplied by the municipality.
      </p>
      <div style="height: 25px"></div>
      <p>
        2. The lessor hereby warrants that the lessee can have peaceful
        enjoyment of the House, without any interference by the lessor.
      </p>
      <div style="height: 25px"></div>
      <p>
        3. The lessor shall, at his own cost and expense, be responsible for all
        major maintenance, repair and structural work related to walls,
        ceilings, roofs, floors, foundations, plumbing and related permanent
        fixtures. The lessor will be responsible for any damages caused by
        breakdown of these systems or failure to maintain them.
      </p>

      <div style="height: 25px"></div>

      <p>
        4. The lessor undertakes to repair structural damages due to force
        majeure or latent defects as soon as such damages are evident. Such
        causes include fire, lightning, storm, tempest, explosion, riots, civil
        unrest, flood, earthquake, bursting or overflowing of pipes, water
        tanks, boiler or machinery or any other act of God. Should the premises
        be destroyed or rendered unfit for habitation by such an act, this
        agreement may, at the option of the lessee, immediately terminate.
        Should the lessee exercise this option, he will give twenty (20) days
        written notice to the lessor, and no rent shall accrue after such
        termination.
      </p>

      <div style="height: 25px"></div>
      <p>
        5. The lessor or his authorized representative may visit and inspect the
        house during normal working hours by giving twenty-four (24) hours prior
        notice to the lessee.
      </p>
      <div style="height: 25px"></div>

      <h2>ARTICLE VIII</h2>
      <h2>Termination of the Lease Agreement</h2>
      <div style="height: 25px"></div>
      <p>
        1. If, and when, the lessee fails to fulfill his obligations under this
        contract, the lessor shall be entitled to terminate the contract and
        claim compensation for any damage sustained by giving two (2) months'
        advance notice to the lessee.
      </p>
      <div style="height: 25px"></div>
      <p>
        2. If the lessor sells the premises, or defaults under any mortgage or
        trust related to the premises, and if ownership should transfer to
        another, the lessor shall give the lessee written notice of the identity
        of such third party prior to the sale or transfer. The lessee then has
        the right to terminate the lease agreement by giving sixty (60) days
        advance notice of termination.
      </p>
      <div style="height: 25px"></div>
      <p>
        3. Likewise, if and when the lessor fails to fulfil any of the
        conditions of this contract, the lessee may terminate the contract upon
        giving two months' advance notice to the lessor, without prejudice to
        the right of the lessee to claim any compensation for any damage
        sustained.
      </p>
      <div style="height: 25px"></div>
      <p>
        4. Upon termination of this contract the lessee agrees to hand over the
        household furniture in good order to the lessor or his authorized
        representative.
      </p>
      <div style="height: 25px"></div>

      <h2>ARTICLE IX</h2>
      <div style="height: 25px"></div>

      <h2>Duration and renewal of the Contract</h2>
      <div style="height: 25px"></div>
      <p>
        1. This Contract shall remain valid for a period of
         (___<span class="under">{{Receiver.data.rent_request.rent_duration}} months</span>_)
        starting from ____<span class="under">{{moment(Receiver.data.created_at).format('MM/DD/YYYY')}}</span>___.
      </p>
      <div style="height: 25px"></div>
      <p>
        2. With the prior consent of the two parties, this agreement may be
        renewed for a further additional period of time.
      </p>
      <div style="height: 25px"></div>

      <h2>ARTICLE X</h2>

      <h2>Dispute Resolution</h2>
      <div style="height: 25px"></div>
      <p>
        In the event that any disputes arise concerning the text of this
        agreement, the English version controls. Any disputes arising between
        the parties hereto concerning this lease which cannot be resolved in
        negotiations between the lessor and lessee shall be settled by
        arbitration. The arbitrator must be appointed by the agreement of both
        parties within ten working days of a formal written letter of complaint
        being submitted by one party to the other.
      </p>
      <div style="height: 25px"></div>
      <h2>ARTICLE XI</h2>
      <h2>Governing Law</h2>
      <div style="height: 25px"></div>
      <p>
        The terms and conditions set herein are consistent with local laws and
        it is governed by the Civil Code of Ethiopia, 1960. This contract has
        been prepared in two original copies.
      </p>
      <div style="height: 25px"></div>
      <p>
        In witness whereof, the parties hereto and the below mentioned witnesses
        have put their respective signature on this contract on the year, date
        and place first above mentioned.
      </p>
      <div style="height: 25px"></div>
        <div style="height: 25px"></div>
        <div style="height: 25px"></div>
        <div style="height: 25px"></div>
        <div style="height: 25px"></div>
        <div style="height: 25px"></div>
        <div style="height: 25px"></div>

      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <h2>LESSOR</h2>
            <div style="height: 25px"></div>

            <p>
              ____<span class="text-capitalize under">{{Receiver.data.owner.first_name}} {{Receiver.data.owner.last_name}}</span>______ <br />
              Signature <br />
              ___________ <br />
              Date
            </p>
          </v-col>
          <v-col cols="6">
            <h2>LESSEE</h2>
            <div style="height: 25px"></div>

            <p>
            ____<span class="text-capitalize under">{{Receiver.data.requester.first_name}} {{Receiver.data.requester.last_name}}</span>______ <br />

              Signature <br />
              ___________ <br />
              Date
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div style="height: 25px"></div>
            <h2>WITNESSES PRESENT</h2>
            <div style="height: 25px"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p>Name:______________________</p>
            <p>Signature:___________________</p>
          </v-col>
          <v-col cols="6">
            <p>Name:______________________</p>
            <p>Signature:___________________</p>
          </v-col>
        </v-row>
      </v-container>
    </dir>
  </v-container>
</template>

<script>
var moment = require('moment');
import { RentService } from "../../../services/rent.service";

export default {
  name: "contract_vue",
  data() {
    return {
      moment,
      show_btn: true,
      Receiver: {
        data: null,
        loaded: false,
        error: null,
      },
    };
  },
  methods: {
      print() {
            this.show_btn = false;
            document.title = "Rent Contract";
            setTimeout(() => { 
                window.print();
                this.show_btn = true;
                document.title = "Betoch Rent - your #1 choice";
            }, 1);
        }

  },
  async created() {
    this.rentService = new RentService(this);
    await this.rentService.rentDetail(this.$route.params.id, this.Receiver);
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
p {
  font-size: 1.14em;
}
h2 {
  font-size: 1.6em;
}
.under {
    text-decoration: underline;
}
</style>